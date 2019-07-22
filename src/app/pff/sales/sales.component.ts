import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../@core/services/api.auth";
import {Item, PffInvoiceModel, PffInvoiceDetailModel} from "../../@core/domains/pff.model";
import {Title} from "@angular/platform-browser";
import * as moment from 'moment';
import {Router} from "@angular/router";

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor(private authService: ApiAuth, private titleService: Title,
              private router: Router) {
    //this.resultheading="";
    //this.total=0;
    this.titleService.setTitle( "Passion For Foods" );
  }

  ngOnInit() {
    this.selectedItem="";
    this.total=0;
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
    this.newArray=[];
    this.loadData();
    this.invoiceItem=[];
    this.pffInvoiceLines=[];
    this.pffInvoice=new PffInvoiceModel();

  }

  public num1:number;
  public num2:number;
  public total:number;
  public selectedItem: any;
  itemsList: Item[];
  newArray = [];
  oldItem: Item;

  invoiceItem = [];
  pffInvoice: PffInvoiceModel;
  pffInvoiceLines= [];

  updateInvoice(item) {
    //console.log(item);
    const index = this.invoiceItem.findIndex(x => x.itemid === item.itemid);
    if(index>=0) {
      this.oldItem= this.invoiceItem[index];
      this.oldItem.quantity += item.newquantity;
      this.oldItem.total =  this.oldItem.quantity * this.oldItem.price;

      this.invoiceItem.splice(index, 1);
      this.invoiceItem.push(this.oldItem);

    }else {
      item.quantity= item.newquantity;
      item.total = item.quantity*item.price;
      this.invoiceItem.push(item);
    }
    this.printInvoiceItem();
    //this.selectedItem += item.itemname + "           "+item.sellunit + "         "+   item.price + "\n";
    //this.total+=item.price;
    this.getTotal();
  }

  removeInvoice(item){
    const index = this.invoiceItem.findIndex(x => x.itemid === item.itemid);
    //console.log(index);
    if(index>=0) {
      this.invoiceItem.splice(index, 1);
      this.printInvoiceItem();
      this.getTotal();
    }

    //this.selectedItem += item.itemname + "           "+item.sellunit + "         "+   item.price + "\n";
    //this.total+=item.price;

  }

  getTotal()
  {
    var numbers = this.invoiceItem.map(i => i.total);
    var sum = numbers.reduce((a, b) => a + b, 0);
    this.total = sum;
  }

  printInvoiceItem(){
    this.selectedItem="Name" + "        " +"QTY" + "        " + "Price" + "        " + "Total" +"\n";
    this.invoiceItem.forEach(item =>
        this.selectedItem += item.itemname + "           "+item.quantity + "         "+   item.price + "        " + item.total +"\n"
    );
  }

//https://github.com/miki995/angular-bootstrap-row-colum/blob/master/src/app/app.component.ts

  loadData(): void {
    try
    {
      this.authService.getPffItemList().subscribe(data => {
        this.itemsList=data;

        for (let i = 0; i < this.itemsList.length; i += 6) {
          this.newArray.push({ items: this.itemsList.slice(i, i + 6) });
        }
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  indexTracker(index: number, value: any) {
    console.log(index);
    console.log(value);
    return index;
  }

  saveInvoice(paidby)
  {
    if(this.invoiceItem.length==0){
      alert("No item addedd to saved !!");
      return;
    }
    //this.pffInvoice=new PffInvoiceModel();
    this.pffInvoice.total = this.total;
    this.pffInvoice.paidby=paidby;
    //this.pffInvoice.createdtime = moment(new Date()).format('YYYY-MM-DD HH:mm');
    this.pffInvoice.invoiceitems=this.invoiceItem.length;

    //this.pffInvoiceLines=new PffInvoiceDetailModel{};
    this.invoiceItem.forEach(item =>
        //PffInvoiceDetailModel line=new PffInvoiceDetailModel();
        this.pffInvoiceLines.push(item)
    );
    this.pffInvoice.pffInvoiceLines = this.pffInvoiceLines;

    this.authService.savePffInvoice(this.pffInvoice).subscribe(data => {
      console.log(data);
      alert("Invoice saved..");
      //this.refreshPage();
      //this.router.navigate(['/pff/sales']);
      //this.ref.close("saved");
      //this.router.navigated = false;
      //this.router.navigate([this.router.url]);
    });
  }

  refreshPage()
  {

    this.ngOnInit();
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    //this.router.navigated = false;
    //this.router.navigate([this.router.url]);
  }

}
