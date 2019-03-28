import {Component, OnInit, Input} from '@angular/core';
import {SupplierModel} from "../../../@core/domains/user.model";
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {

  @Input() title: string;
  @Input() supplier: SupplierModel;

  constructor(protected ref: NbDialogRef<EditSupplierComponent>,
              private authService: ApiAuth) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    if(this.supplier!=null) {
      console.log(this.supplier);
    }else {
      this.supplier=new SupplierModel();
    }
  }

  submit() {
    console.log(this.supplier);
    this.authService.saveSupplier(this.supplier).subscribe(data => {
      console.log(data);
      //alert("Employee saved..");
      this.ref.close("saved");
    });

  }

}
