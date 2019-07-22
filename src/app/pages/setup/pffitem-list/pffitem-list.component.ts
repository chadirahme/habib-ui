import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ApiAuth} from "../../../@core/services/api.auth";
import {Item} from "../../../@core/domains/pff.model";

@Component({
  selector: 'pffitem-list',
  templateUrl: './pffitem-list.component.html',
  styleUrls: ['./pffitem-list.component.scss']
})
export class PffitemListComponent implements OnInit {

  item:Item;

  source: LocalDataSource = new LocalDataSource();
  settings = {
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
      // itemid: {
      //   title: 'ID',
      //   type: 'number',
      //   editable: false,
      //   addable: false,
      // },
      itemname: {
        title: 'Item Name',
        type: 'string',
      },
      itemdescription: {
        title: 'Description',
        type: 'string',
      },
      sellunit: {
        title: 'sell Unit',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      sortitem: {
        title: 'Sortitem',
        type:  'number',
      },
    },
  };
  constructor(private authService: ApiAuth) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try
    {
      this.authService.getAllPffItemList().subscribe(data => {
        this.source.load(data);
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onCreateConfirm(event):void {
    if (window.confirm('Are you sure you want to create ' + event.newData.itemname )) {
      //event.newData.listValue += ' + added in code';
      //event.newData.listId=1;
      this.authService.savePffItem(event.newData).subscribe(data => {
        console.log(data);
      });

      event.confirm.resolve(event.newData);

    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event):void {
    console.log(event.newData);
    event.confirm.resolve(event.newData);
    //alert('save');
   // this.item=new Item();
    //this.item.itemid=event.newData.itemid;
    //this.item.listId=1;
    //this.item.listValue=event.newData.listValue;
    this.authService.savePffItem(event.newData).subscribe(data => {
      console.log(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
