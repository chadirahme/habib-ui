import {AccountingComponent} from "./accounting.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {AccountingRoutingModule} from "./accounting.routing";
import {NbDialogModule, NbWindowModule, NbDatepickerModule} from "@nebular/theme";
import {PaymentsSupplierComponent} from "./payments-supplier/payments-supplier.component";
import {NgModule} from "@angular/core";
import {ThemeModule} from "../../@theme/theme.module";
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import {CurrencyPipe} from "@angular/common";
const COMPONENTS = [
    AccountingComponent,
    PaymentsSupplierComponent,

];

const MODULES = [
    ThemeModule,
    AccountingRoutingModule,
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
        EditPaymentComponent,
    ],
    providers: [
        CurrencyPipe,
        //...SERVICES,
    ],
    entryComponents: [EditPaymentComponent]
})
export class AccountingModule { }
