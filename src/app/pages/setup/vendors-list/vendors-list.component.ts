import {Component, OnInit, Input} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {ApiAuth} from "../../../@core/services/api.auth";

@Component({
  selector: 'vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit{

  @Input() title: string;
  @Input() employee: any;
  listProfessionsValues: any[];
  selectedProfession: any;
  dateValue: Date;

  constructor(protected ref: NbDialogRef<VendorsListComponent>,
              private authService: ApiAuth) {
  }

  ngOnInit() {
    this.selectedProfession= this.employee.profession.id;//{"id":1,"listId":1,"listValue":"CHEF"};
    this.loadProfessionsData();
    if(this.employee.startdate==null)
    this.dateValue = new Date();
    else
    this.dateValue= this.employee.startdate;
  }

  dismiss() {
    //this.ref.close();
  }

  name: string;
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

  loadProfessionsData(): void {
    try {
      this.authService.getProfessionsList().subscribe(data => {
        this.listProfessionsValues = data.result;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  filterForeCasts(filterVal: any) {
    console.log(filterVal);
    //   if (filterVal == "0")
    //     this.forecasts = this.cacheForecasts;
    //   else
    //     this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
    // }
  }

}
