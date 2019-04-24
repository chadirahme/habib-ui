import {ListValueModel} from "./listvalue.model";
export class UserModel {
    userid:any;
    email: string;
    username:string;
    password: string;
}

export class EmployeeModel {
    employeeid:number;
    firstName:string;
    lastName:string;
    status: string;
    startdate: any;
    phone:string;
    email: string;
    hourRate: number;
    profession:ListValueModel;
}

export class SupplierModel {
    supplierid:number;
    suppliername:string;
    phone:string;
    email: string;
    mobile: string;
    description:string;
}


export class PaymentModel {
    paymentid:number;
    supplierid:number;
    paymentdate:string;
    amount: number;
    description:string;
    paidby:string;
    userid:number;
    createdtime:any;
    filename:string;
    filepath:string;
    supplier:SupplierModel;
    user:UserModel;
}