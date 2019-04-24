import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {NbDialogService} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";
import {EditPaymentComponent} from "../edit-payment/edit-payment.component";
import {PaymentModel, SupplierModel} from "../../../@core/domains/user.model";
import {CurrencyPipe} from "@angular/common";
import {ButtonRenderComponent} from "./button.render.component";

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
  alldata:any[];
  filterData:any[];
  totalAmount:number;
  filterAmount:number;
  supplierList: any[];
  selectedSupplier: any;

  settings = {
    mode: 'external',
    hideSubHeader: false,
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
      // filepath: {
      //   title: 'Attach',
      //   type: 'string',
      //   valuePrepareFunction: (filepath) => {
      //     return filepath==null?"":"View";
      //   }
      // },
      filename: {
        title: 'Attach',
        type: 'custom',
        renderComponent: ButtonRenderComponent,
        defaultValue: 'View',
        valuePrepareFunction: (filepath) => {
          return filepath==null?"NA":"View";
        },
        onComponentInitFunction:(instance)=> {
          instance.save.subscribe(row => {
           // alert(`${row.paymentid} saved!`)
            this.onExport(row.filename);
          });
        }
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

  private handleUpdatedUser(updatedUserData: any) {
    // TODO is it possible to update only single row with update result instead of full table?
    //this.usersSource.refresh();
  }

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
     this.filterData = this.alldata.filter(pilot => pilot.supplier.supplierid===this.selectedSupplier.supplierid);
    this.source.load(this.filterData);
    this.source.refresh();
    this.calTotalSupplierPayments(this.selectedSupplier.suppliername);

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
        //this.alldata=null;
        this.alldata=data;
        this.calTotalPayments();
        this.callType("");
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

  onDelete(event) {
    //console.log("filterData1>>" + this.alldata.length);
    if (window.confirm('Are you sure you want to delete this payment?')) {
      this.authService.deletePayment(event.data).subscribe(data => {
        //console.log(data);
       // alert("Payment is deleted..");
        this.loadData();

        //this.alldata.pop();

       // this.filterData = this.alldata.filter(pilot => pilot.supplier.supplierid===this.selectedSupplier.supplierid);
            // .subscribe((data) => {
            //   this.filterData.push(data);
            // });

       // console.log("filterData2>>" + this.filterData.length);
        //this.source=new LocalDataSource(this.filterData);
        //this.source.load(filterData);
        //this.source.refresh();
        //this.callType("");
      });

      console.log("filterData3>>" + this.alldata.length);
    }

    else {
      // event.confirm.reject();
    }
  }

  createRow(event: any) {
    this.payment=new PaymentModel();
    this.payment.amount=0;
    this.payment.paidby="Visa Card";
    this.payment.supplier=new SupplierModel();
    this.payment.createdtime=new Date();
    this.payment.description="";
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
    console.log(this.selectedSupplier);
    this.callType("");
  }

  onExport(filename: string) {
    try {
      console.log(filename);
      //return ;
      this.authService.getFiles(filename).subscribe(data => {
        console.log('done');
        let blob = new Blob([data], {type: "application/octet-stream"});
        let fileName: string = filename; //"myfile.png" //+ this.request.output;
        let dataType = data.type;
        console.log(dataType);

        let binaryData = [];
        binaryData.push(data);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (fileName)
          downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();


        // window.navigator.msSaveBlob(blob, fileName);


        //const blob1 = new Blob([data], { type: 'text/csv' });
        //const url= window.URL.createObjectURL(blob1);
        //window.open(url);
        //FileSaver.saveAs(blob1, 'data.csv');
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}
