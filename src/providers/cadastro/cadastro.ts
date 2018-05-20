import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../api';

@Injectable()
export class CadastroProvider {

    constructor(private http: HttpClient) {}

    getEnderecoByCEP(cep: string) {
        return new Promise((resolve, reject) => {
            this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
                .subscribe(response => {
                    resolve(response);
                },
                (error) => {
                    reject(error)
                }
            )
        });         
    }

    salvar(data) {
        return new Promise((resolve, reject) => {
            this.http.post(`${api.url}/bancas`, data)
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
