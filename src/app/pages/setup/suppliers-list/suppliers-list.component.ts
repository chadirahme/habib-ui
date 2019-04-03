import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {NbDialogService} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";
import {EditSupplierComponent} from "../edit-supplier/edit-supplier.component";

@Component({
  selector: 'suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit {

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
      supplierid: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
      },
      suppliername: {
        title: 'Supplier Name',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      mobile: {
        title: 'Mobile',
        type: 'string',
      },
      email: {
        title: 'Email',
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
      this.authService.getSuppliersList().subscribe(data => {
        this.source.load(data);
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onDelete(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        this.authService.deleteSupplier(event.data).subscribe(data => {
          console.log(data);
          if(data.status==424){
            alert("You can't delete this Supplier. Some payments link to him!!");
            return;
          }
          alert("Supplier is deleted..");
          this.loadData();
        });

      }
      catch (e) {
        console.log(e);
        alert("Error at deleting process!! ");
      }
    }
    else
      {
        // event.confirm.reject();
      }
    }

  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
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
    this.loadData();
  }

  editRow(event) {
    this.dialogService.open(EditSupplierComponent, {
      context: {
        title: 'Edit Supplier: '+ event.data.suppliername,
        supplier: event.data,
      },
    }).onClose.subscribe (name => name && this.checkResult(name));
    //(name => this.result && console.log(name));
  }

  createRow(event: any) {
    // console.log('on add event: ', event);
    this.dialogService.open(EditSupplierComponent, {
      context: {
        title: 'Add New Supplier',
        supplier: null,
      },
    }).onClose.subscribe (name => name && this.checkResult(name));
  }
}
