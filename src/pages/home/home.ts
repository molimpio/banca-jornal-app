import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { ToastController } from 'ionic-angular';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { ItemPage } from '../item/item';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(private navCtrl: NavController,
        private toastCtrl: ToastController,
        private cadastroProvider: CadastroProvider,
        private alertCtrl: AlertController) {

    }

    avancar() {
        this.navCtrl.push(CadastroPage);
    }

    buscarDados() {
        let prompt = this.alertCtrl.create({
            title: 'Recuperar Dados',
            message: "Digite o endereço de email que foi cadastrado",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email...'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => { }
                },
                {
                    text: 'OK',
                    handler: data => {
                        this.buscarCadastro(data)
                    }
                }
            ]
        });
        prompt.present();
    }

    buscarCadastro(data) {        
        if (this.validateEmail(data.email)) {
            this.cadastroProvider.getDadosByEmail(data)
                .then(response => {
                    if (response) {
                        window.localStorage.setItem("cadastrado", "true");
                        window.localStorage.setItem("banca", JSON.stringify(response));
                        this.navCtrl.setRoot(ItemPage);                        
                    } else {
                        this.presentToast("Cadastro não encontrado!");
                    }
                })
                .catch(error => console.log("error ", error))
        } else {
            this.presentToast("Email inválido !");
        }
    }

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    private validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    private presentToast(mensagem) {
        let toast = this.toastCtrl.create({
            message: mensagem,
            duration: 5000
        });
        toast.present();
    }

}
