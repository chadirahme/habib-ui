import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {ListValueModel} from "../../../@core/domains/listvalue.model";

@Component({
  selector: 'professions-list',
  templateUrl: './professions-list.component.html',
  styleUrls: ['./professions-list.component.scss']
})
export class ProfessionsListComponent implements OnInit {

  listValues: any[];
  item:ListValueModel;

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
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
      },
      listValue: {
        title: 'Name',
        type: 'string',
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
      this.authService.getProfessionsList().subscribe(data => {
        this.listValues=data.result;
        this.source.load(data.result);
       // this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        for (const car of data.result) {
          console.log(car);
        }
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onCreateConfirm(event):void {
    if (window.confirm('Are you sure you want to create ' + event.newData.listValue )) {
      //event.newData.listValue += ' + added in code';
      event.newData.listId=1;
      this.authService.saveListValue(event.newData).subscribe(data => {
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
    this.item=new ListValueModel();
    this.item.id=event.newData.id;
    this.item.listId=1;
    this.item.listValue=event.newData.listValue;
    this.authService.saveListValue(this.item).subscribe(data => {
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
