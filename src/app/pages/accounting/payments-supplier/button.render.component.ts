import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
    template: `
    <button nbButton status="info" size="small" (click)="example()" *ngIf="showSave">{{ renderValue }}</button>
  `,
})
export class ButtonRenderComponent implements OnInit {

    //https://github.com/akveo/ng2-smart-table/blob/master/src/app/pages/examples/custom-edit-view/basic-example-button-view.component.ts

    showSave = false;
    public renderValue;

    @Input() value;
    @Input() rowData: any;
    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor() {  }

    ngOnInit() {
        this.renderValue = this.value;
        this.showSave=this.value=="View";
    }

    example() {
        this.save.emit(this.rowData);
        //alert(this.renderValue);
    }


}