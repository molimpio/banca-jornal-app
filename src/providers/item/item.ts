import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../api';

@Injectable()
export class ItemProvider {

    constructor(private http: HttpClient) { }

    getItens() {        
        return new Promise((resolve, reject) => {
            this.http.get(`${api.url}/items`)
                .subscribe(response => resolve(response),
                (error) => reject(error)
            )
        });   
    }
    
    salvar(data) {
        return new Promise((resolve, reject) => {
            this.http.post(`${api.url}/items`, data)
                .subscribe(response => {
                    resolve(response);
                },
                (error) => {
                    reject(error)
                }
            )
        });      
    }

}
