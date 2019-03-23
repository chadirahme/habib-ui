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
    baseUrl: string = 'http://localhost:8090/';

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
}