import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {NbDialogService} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";
import {EditPaymentComponent} from "../edit-payment/edit-payment.component";
import {PaymentModel, SupplierModel} from "../../../@core/domains/user.model";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'payments-supplier',
  templateUrl: './payments-supplier.component.html',
  styleUrls: ['./payments-supplier.component.scss']
})
export class PaymentsSupplierComponent implements OnInit {

  @ViewChild('grid')
  table;

  payment: PaymentModel;
  source: LocalDataSource = new LocalDataSource();
  alldata:any;
  totalAmount:number;
  filterAmount:number;
  supplierList: any[];
  selectedSupplier: any;

  settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 15,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // paymentid: {
      //   title: 'ID',
      //   type: 'number',
      //   editable: false,
      //   addable: false,
      // },
      supplier: {
        title: 'Supplier Name',
        type: 'string',
        valuePrepareFunction: (supplier) => {
          return supplier.suppliername;
        },filterFunction(supplier?: any, search?: string): boolean {
          //console.log(supplier);
          //console.log(search);
          let match = supplier.suppliername.toLowerCase().indexOf(search.toLowerCase()) >= 0
          if (match || search === '') {
            //this.calTotalSupplierPayments(search);
            return true;
          } else {
            return false;
          }
        },
      },
      paymentdate: {
        title: 'Date',
        type: 'string',

      },
      amount: {
        title: 'Amount',
        type: 'string',
        valuePrepareFunction: (amount) => {
         return this.cp.transform(amount);
        }
      },
      paidby: {
        title: 'Paid By',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: true,
      edit:true,
      editable:false,
      columnTitle: '',
    },
  };

  constructor(private authService: ApiAuth,private dialogService: NbDialogService,private cp: CurrencyPipe) { }

  ngOnInit() {
    this.totalAmount=0;
    this.loadSuppliersData();
    this.loadData();
  }
  loadSuppliersData(): void {
    try {
      this.authService.getSuppliersList().subscribe(data => {
        this.supplierList = data;
        this.selectedSupplier=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  callType(value){
    //if(value==null)
    console.log(this.selectedSupplier);
    if(this.selectedSupplier==0){
      this.source.load(this.alldata);
      this.filterAmount=0;
      return;
    }
    const filterData = this.alldata.filter(pilot => pilot.supplier.supplierid===this.selectedSupplier.supplierid);
    this.source.load(filterData);
    this.calTotalSupplierPayments(this.selectedSupplier.suppliername);
    //this.source.refresh();
    //this.order.type=value;
  }

  // ngAfterViewInit(): void {
  //
  //   this.table.grid.source.onChangedSource.subscribe(() => {
  //     // update other component with the SUM
  //     //this.totalAmount=this.table.grid.source.length;
  //     //this.source.refresh();
  //     console.log(this.table.grid.source.data.length);
  //
  //   });
  // }

  // getTotalCost() {
  //   if(this.alldata!=null)
  //     return 100;
  //   //return this.source.data.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  // }
  onSearch(query: string = '') {
    if(query==='') {
      this.source.load(this.alldata);
      this.totalAmount = this.alldata.reduce((acc, pilot) => acc + pilot.amount, 0);
      return;
    }
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'supplier',
        search: query
      },
    ], false);
    // this.source.refresh();
    // this.getTotalCost();
    //this.totalAmount=this.source.data.length;

    const rebels = this.alldata.filter(pilot => pilot.supplier.suppliername.toLowerCase().startsWith(query.toLowerCase()));
    var jediScores = rebels.map(function (jedi) {
      return jedi.amount;
    });
    var totalJediScore = jediScores.reduce(function (acc, score) {
      return acc + score;
    }, 0);
    this.filterAmount=totalJediScore;
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  calTotalPayments(){
    var mapAmounts = this.alldata.map(function (payment) {
      return payment.amount;
    });
    var sumAmount = mapAmounts.reduce(function (acc, amount) {
      return acc + amount;
    }, 0);

    this.totalAmount=sumAmount;
  }
  calTotalSupplierPayments(search){
    console.log("ssss "+search);
    if(search==null || search === ''){
      this.filterAmount=0;
      return;
    }

    const filterAmount = this.alldata.filter(payment => payment.supplier.suppliername.toLowerCase().indexOf(search.toLowerCase()) >= 0);

    var mapAmounts = filterAmount.map(function (payment) {
      return payment.amount;
    });
    var sumAmount = mapAmounts.reduce(function (acc, amount) {
      return acc + amount;
    }, 0);

    this.filterAmount=sumAmount;
  }

  loadData(): void {
    try
    {
      this.authService.getPaymentsList().subscribe(data => {
        this.source.load(data);
        this.alldata=data;
        this.calTotalPayments();
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  editRow(event) {
    console.log('event: ', event.data);
    this.dialogService.open(EditPaymentComponent, {
      context: {
        title: 'Edit Payment: '+ event.data.supplier.suppliername,
        payment: event.data,
      },
    }).onClose.subscribe (name => name && this.checkResult(name));
  }
  onDelete(event){
    console.log('event: ', event.data);
  }


  createRow(event: any) {
    this.payment=new PaymentModel();
    this.payment.amount=0;
    this.payment.paidby="Visa Card";
    this.payment.supplier=new SupplierModel();
    this.payment.createdtime=new Date();
    // console.log('on add event: ', event);
    this.dialogService.open(EditPaymentComponent, {
      context: {
        title: 'Add New Payment',
        payment: this.payment,
      },
    }).onClose.subscribe (name => name && this.checkResult(name));
  }

  checkResult(msg){
    console.log(msg);
    this.loadData();
  }

}
