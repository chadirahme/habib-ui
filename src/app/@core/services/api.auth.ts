import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../domains/api.response";
import {Observable} from "rxjs";
import {ListValueModel} from "../domains/listvalue.model";
@Injectable()
export class ApiAuth {

    constructor(private http: HttpClient) {
        //this.baseUrl = baseUrl;
    }
    // baseUrl: string ='http://localhost:8091/api/';
    baseUrl: string = 'http://api.mainehabib.com/'; //'http://localhost:8090/'; //'http://139.162.169.243/';

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
        return this.http.post<any>(this.baseUrl+'rest-suppliers/delete/',supplier);
    }

    //rest-payments
    getPaymentsList(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl+'rest-payments/all');
    }
    savePayment(payment: any): Observable<any> {
        return this.http.post<any>(this.baseUrl+'rest-payments/save/',payment);
    }

}