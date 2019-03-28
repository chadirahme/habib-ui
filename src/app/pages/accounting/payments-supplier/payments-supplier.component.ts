import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {NbDialogService} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";
import {EditPaymentComponent} from "../edit-payment/edit-payment.component";
import {PaymentModel, SupplierModel} from "../../../@core/domains/user.model";

@Component({
  selector: 'payments-supplier',
  templateUrl: './payments-supplier.component.html',
  styleUrls: ['./payments-supplier.component.scss']
})
export class PaymentsSupplierComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
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
      paymentid: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
      },
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

  constructor(private authService: ApiAuth,private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try
    {
      this.authService.getPaymentsList().subscribe(data => {
        this.source.load(data);
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

  payment: PaymentModel;
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
