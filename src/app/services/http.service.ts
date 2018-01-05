import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": " Token " + localStorage.getItem('stocktoken')
    })
};

@Injectable()
export class HttpService {
    endpoint: string;
    
    constructor(private http: HttpClient) {
        this.endpoint = environment.endpoint;
    }

    get(uri: string) {
        return this.http.get(this.endpoint + uri, httpOptions);
    }

    post(uri: string, body?: any) {
        return this.http.post(this.endpoint + uri, body, httpOptions);
    }

    put(uri: string, body?: any) {
        return this.http.put(this.endpoint + uri, body, httpOptions);
    }

    delete(uri: string) {
        return this.http.delete(this.endpoint + uri, httpOptions);
    }

}
