import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {ListValueModel} from "../../../@core/domains/listvalue.model";
import {LocalDataSource} from "ng2-smart-table";
import {NbWindowService, NbDialogService} from "@nebular/theme";
import {VendorsListComponent} from "../vendors-list/vendors-list.component";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  listValues: any[];
  item:ListValueModel;
  result: string;

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
      employeeid: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      profession: {
        title: 'profession',
        type: 'string',
        valuePrepareFunction: (profession) => {
          return profession.listValue;
        }
      },
      status: {
        title: 'Status',
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

  constructor(private authService: ApiAuth,private windowService: NbWindowService,
              private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try
    {
      this.authService.getEmployeeList().subscribe(data => {
        this.listValues=data;
        this.source.load(data);
        // this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        for (const car of data) {
          console.log(car);
        }
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['firstName'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['firstName'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  checkResult(msg){
    console.log(msg);
  }

  editRow(event) {
   // console.log('event: ', event);
   // this.windowService.open(VendorsListComponent, { title: `Window` });

    //this.windowService.open(EditEmployeeComponent, { title: `Window` });

    this.dialogService.open(VendorsListComponent, {
      context: {
        title: 'Edit Employee: '+ event.data.firstName,
        employee: event.data,
      },
    }).onClose.subscribe(name => this.result && console.log(name));

  }

}
