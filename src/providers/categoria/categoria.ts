import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { api } from '../api';

@Injectable()
export class CategoriaProvider {

    constructor(private http: HttpClient) {

    }

    getCategorias(): Observable<any> {
        return this.http.get(`${api.url}/categorias`).map(response => response);
    }

}
