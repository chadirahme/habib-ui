import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Item} from "../../@core/domains/pff.model";

@Component({
  selector: 'sellitem',
  templateUrl: './sellitem.component.html',
  styleUrls: ['./sellitem.component.scss']
})
export class SellitemComponent{
  @Input() item: Item;
  //@Output  resultheading: any;
   resultheading: any;
   @Output() valueChange = new EventEmitter();

  @Output() cancelItem = new EventEmitter();

  addItem(item) {
    item.newquantity=1;
    //console.log(item);
    //this.result = this.num1 + this.num2;
    //this.valueChange += item.itemname  + "\n";
    this.valueChange.emit(item);
  }

  add2Item(item,qty) {
    item.newquantity=qty;
    //console.log(item);
    //this.result = this.num1 + this.num2;
    //this.valueChange += item.itemname  + "\n";
    this.valueChange.emit(item);
  }


  removeItem(item){
    this.cancelItem.emit(item);
  }
}