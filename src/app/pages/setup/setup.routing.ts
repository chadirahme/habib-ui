import { Routes, RouterModule } from '@angular/router';
import {EmployeesListComponent} from "./employees-list/employees-list.component";
import {NgModule} from "@angular/core";
import {SetupComponent} from "./setup.component";
import {VendorsListComponent} from "./vendors-list/vendors-list.component";
import {ProfessionsListComponent} from "./professions-list/professions-list.component";
import {SuppliersListComponent} from "./suppliers-list/suppliers-list.component";

const routes: Routes = [
    {
        path: '',
        component: SetupComponent,
        children: [
            {
                path: 'employees-list',
                component: EmployeesListComponent,
            },
            {
                path: 'suppliers-list',
                component: SuppliersListComponent,
            },
            {
                path: 'professions-list',
                component:ProfessionsListComponent,
            }
        ],
    }
];

// export const routing = RouterModule.forChild(routes);
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SetupRoutingModule {
}
