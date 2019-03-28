import { Routes, RouterModule } from '@angular/router';
import {NgModule} from "@angular/core";
import {AccountingComponent} from "./accounting.component";
import {PaymentsSupplierComponent} from "./payments-supplier/payments-supplier.component";
const routes: Routes = [
    {
        path: '',
        component: AccountingComponent,
        children: [
            {
                path: 'payments-supplier',
                component: PaymentsSupplierComponent,
            },
            {
                path: 'suppliers-list',
                component: PaymentsSupplierComponent,
            },
            {
                path: 'professions-list',
                component:PaymentsSupplierComponent,
            }
        ],
    }
];

// export const routing = RouterModule.forChild(routes);
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountingRoutingModule {
}
