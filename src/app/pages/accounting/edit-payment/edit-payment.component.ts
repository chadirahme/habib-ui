import {Component, OnInit, Input} from '@angular/core';
import {PaymentModel, UserModel} from "../../../@core/domains/user.model";
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogRef} from "@nebular/theme";
import * as moment from 'moment';
//import moment = require("moment");
//import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent implements OnInit {

  @Input() title: string;
  @Input() payment: PaymentModel;
  dateValue: any;
  paidby:any;
  supplierList: any[];
  selectedSupplier: any;
  selectedFiles: FileList;
  currentFileUpload: File;
  paymentid:number;

  constructor(protected ref: NbDialogRef<EditPaymentComponent>,
              private authService: ApiAuth) { }

  ngOnInit() {
    this.loadSuppliersData();
  }

  loadSuppliersData(): void {
    try {
      this.authService.getSuppliersList().subscribe(data => {
        this.supplierList = data;
        this.selectedSupplier=0;
        this.loadPaymentData();
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  loadPaymentData(){
    if(this.payment!=null) {
      console.log(this.payment);
      this.paymentid=this.payment.paymentid;
      this.payment.user=new UserModel();
      this.payment.createdtime=new Date();
      //this.selectedSupplier = this.payment.supplier.supplierid;//{"id":1,"listId":1,"listValue":"CHEF"};
      if (this.payment.paymentdate == null) {//add new
        this.dateValue = new Date();
      }
      else {
        this.selectedSupplier = this.payment.supplier.supplierid;
        this.dateValue =new Date(this.payment.paymentdate+"T00:00:00");
      }
    }else {
      this.payment=new PaymentModel();
      this.payment.amount=10;
      //this.employee.profession=new ListValueModel();
      //this.employee.status="Active";
      this.dateValue = new Date();
    }
  }

  submit() {
   if(this.selectedSupplier==0){
     alert("Please select a Supplier !!");
     return;
   }

   this.payment.paymentid=this.paymentid;
    this.payment.supplierid = this.selectedSupplier;
    this.payment.supplier.supplierid = this.selectedSupplier;
    this.payment.paymentdate = moment(this.dateValue).format('YYYY-MM-DD');
    this.payment.createdtime = moment(new Date()).format('YYYY-MM-DD');
    this.payment.user.userid = parseInt(localStorage.getItem('userid'));
    this.payment.userid = parseInt(localStorage.getItem('userid'));

   if(this.selectedFiles==null) {
     this.authService.savePayment(this.payment).subscribe(data => {
       console.log(data);
       //alert("Employee saved..");
       this.ref.close("saved");
     });
   }else {
     //savePaymentWithAttach
     this.currentFileUpload = this.selectedFiles.item(0);
     this.authService.savePaymentWithAttach(this.currentFileUpload, this.payment).subscribe(data => {
       console.log(data);
       //alert("Employee saved..");
       this.ref.close("saved");
     });
   }

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

}
