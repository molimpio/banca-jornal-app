import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { api } from '../api';

@Injectable()
export class ItemProvider {

    atualizarListaItensEv = new EventEmitter();

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

    excluir(id) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${api.url}/items/${id}`)
                .subscribe(response => {
                    resolve(response);
                },
                (error) => {
                    reject(error)
                }
            )
        });      
    }

    atualizarListaItens() {
        this.atualizarListaItensEv.emit();
    }
}
