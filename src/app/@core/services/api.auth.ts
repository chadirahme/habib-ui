import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../domains/api.response";
import {Observable,throwError} from "rxjs";
import {ListValueModel} from "../domains/listvalue.model";
import {retry,catchError} from "rxjs/internal/operators";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {PaymentModel} from "../domains/user.model";
import {Item} from "../domains/pff.model";
@Injectable()
export class ApiAuth {

    constructor(private http: HttpClient) {
        //this.baseUrl = baseUrl;
    }
    baseUrl: string ='http://localhost:8091/api/';
        //baseUrl: string = 'http://api.mainehabib.com/'; //'http://localhost:8090/'; //'http://139.162.169.243/';
       // baseUrl: string = 'http://localhost:8090/';

    /**
     * check for expiration and if token is still existing or not
     * @return {boolean}
     */
    isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
}
    // simulate jwt token is valid
    // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
    isTokenExpired(): boolean {
        return false;
    }

    getIsAuthenticated(user: any):Observable<any>{
        return this.http.post<ApiResponse>(this.baseUrl+'rest-employees/getLoginUser',user);
    }

    getProfessionsList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseUrl+'listvalues/allFeildsValuesById/1');
    }

    saveListValue(listValueModel: ListValueModel): Observable<any> {
        return this.http.post<any>(this.baseUrl+'listvalues/listvalue/',listValueModel);
    }

    getEmployeeList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl+'rest-employees/all');
    }
    saveEmployee(employee: any): Observable<any> {
        return this.http.post<any>(this.baseUrl+'rest-employees/save/',employee);
    }

    getSuppliersList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl+'rest-suppliers/all');
    }

    saveSupplier(supplier: any): Observable<any> {
        return this.http.post<any>(this.baseUrl+'rest-suppliers/save/',supplier);
    }
    deleteSupplier(supplier: any): Observable<any> {
        return this.http.post<any>(this.baseUrl+'rest-suppliers/delete/',supplier)
            .pipe(retry(1),
                catchError(this.handleError));
    }

    //rest-payments
    getPaymentsList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl+'rest-payments/all');
    }
    savePayment(payment: any): Observable<any> {
        return this.http.post<any>(this.baseUrl+'rest-payments/save/',payment);
    }
    savePaymentWithAttach(file: File,payment: PaymentModel): Observable<any> {
        let headers = new HttpHeaders();
        //this is the important step. You need to set content type as null
        headers.set('Content-Type', null);
        headers.set('Accept', "multipart/form-data");
        let params = new HttpParams();
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        formData.append('paymentid', payment.paymentid+"");
        formData.append('supplierid', payment.supplier.supplierid+"");
        formData.append('paymentdate', payment.paymentdate);
        formData.append('userid', payment.user.userid);
        formData.append('amount', payment.amount+"");
        formData.append('description', payment.description);
        formData.append('paidby', payment.paidby);


        return this.http.post<any>(this.baseUrl + 'rest-payments/savePaymentWithAttach/', formData, { params, headers });
        //return this.http.post<any>(this.baseUrl+'rest-payments/save/',payment);
    }

    deletePayment(payment: any): Observable<any> {
        return this.http.post<any>(this.baseUrl+'rest-payments/delete/',payment)
            .pipe(retry(1),
                catchError(this.handleError));
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    getPaymentsYearList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl+'rest-payments/allyear');
    }

    getFiles(filename: string): Observable<any> {
        return this.http.get(this.baseUrl+ 'rest-payments/files/'+filename ,{responseType: 'blob' as 'json'});
    }

    //pff
    getPffItemList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl+'pff-item/all?status=A');
    }
    getAllPffItemList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl+'pff-item/all?status');
    }

    savePffItem(item: Item): Observable<any> {
        return this.http.post<any>(this.baseUrl+'pff-item/save/',item);
    }

    savePffInvoice(invoice: any): Observable<any> {
        return this.http.post<any>(this.baseUrl+'pff-item/savePffInvoice/',invoice);
    }
}