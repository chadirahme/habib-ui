export interface Item {
    itemid:number;
    itemname: string;
    itemdescription: string;
    sellunit: string;
    status: string;
    price: number;
    sortitem: number;
    quantity: number;
    newquantity: number;
    total: number;
    //invoiceid:number;
}

export class PffInvoiceModel {
    id:number;
    invoiceitems:number;
    total: number;
    createdtime:any;
    notes:string;
    paidby: string;
    pffInvoiceLines= [];
}

export class PffInvoiceDetailModel {
    id:number;
    invoiceid:number;
    itemid:number;
    itemname: string;
    quantity: number;
    price: number;
    total: number;
}