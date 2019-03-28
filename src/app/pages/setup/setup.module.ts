import { NgModule } from '@angular/core';
import {ThemeModule} from "../../@theme/theme.module";
import {SetupComponent} from "./setup.component";
import {SetupRoutingModule} from "./setup.routing";
import {EmployeesListComponent} from "./employees-list/employees-list.component";
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { ProfessionsListComponent } from './professions-list/professions-list.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NbDialogModule, NbWindowModule, NbDatepickerModule} from "@nebular/theme";
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';

const COMPONENTS = [
   SetupComponent,
    EmployeesListComponent,
    VendorsListComponent,
    ProfessionsListComponent,
];

const MODULES = [
    ThemeModule,
    SetupRoutingModule,
    Ng2SmartTableModule,
    // NbMomentDateModule,
    //TreeModule,
    //Ng2SmartTableModule,
    //ToasterModule.forRoot(),
   // ModalOverlaysRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbDatepickerModule.forRoot(),
];

@NgModule({
    imports: [
        ...MODULES,
    ],
    declarations: [
        ...COMPONENTS,
        EditEmployeeComponent,
        SuppliersListComponent,
        EditSupplierComponent,

    ],
    providers: [
        //...SERVICES,
    ],
    entryComponents: [EditEmployeeComponent,EditSupplierComponent]
})
export class SetupModule { }
