import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { api } from '../api';

@Injectable()
export class UnidadeProvider {

    constructor(private http: HttpClient) {

    }

    getUnidades(): Observable<any> {
        return this.http.get(`${api.url}/unidades`).map(response => response);
    }
}
