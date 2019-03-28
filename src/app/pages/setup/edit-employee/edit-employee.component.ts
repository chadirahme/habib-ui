import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {ApiAuth} from "../../../@core/services/api.auth";
import {EmployeeModel} from "../../../@core/domains/user.model";
import {ListValueModel} from "../../../@core/domains/listvalue.model";

@Component({
  selector: 'edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})

export class EditEmployeeComponent implements OnInit{
  @Input() title: string;
  @Input() employee: any;
  listProfessionsValues: any[];
  selectedProfession: any;
  dateValue: Date;

  constructor(protected ref: NbDialogRef<EditEmployeeComponent>,
              private authService: ApiAuth) {
  }
  ngOnInit() {
    this.loadProfessionsData();

  }
  loadProfessionsData(): void {
    try {
      this.authService.getProfessionsList().subscribe(data => {
        this.listProfessionsValues = data.result;
        this.selectedProfession=1;
        this.loadEmployeeData();
      });

    }
    catch (e) {
      console.log(e);
    }
  }
  loadEmployeeData(){
    if(this.employee!=null) {
      console.log(this.employee.profession.id);
      this.selectedProfession = this.employee.profession.id;//{"id":1,"listId":1,"listValue":"CHEF"};
      if (this.employee.startdate == null)
        this.dateValue = new Date();
      else
        this.dateValue = this.employee.startdate;
    }else {
      this.employee=new EmployeeModel();
      this.employee.profession=new ListValueModel();
      this.employee.status="Active";
      this.dateValue = new Date();
    }
  }

  submit() {
    //this.name="sdsds";
    this.employee.profession.id= this.selectedProfession;
    this.employee.startdate=this.dateValue;
    console.log(this.employee);
    this.authService.saveEmployee(this.employee).subscribe(data => {
      console.log(data);
      //alert("Employee saved..");
      this.ref.close("saved");
    });

  }
}