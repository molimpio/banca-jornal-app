import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemPage } from '../item/item';
import { AlertController } from 'ionic-angular';
import { HelpProvider } from '../../providers/help/help';

@IonicPage()
@Component({
    selector: 'page-cadastro',
    templateUrl: 'cadastro.html'
})
export class CadastroPage {

    cadastroForm: FormGroup;    

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        public cadastroProvider: CadastroProvider,
        private fb: FormBuilder,
        private helpProvider: HelpProvider,
        private alertCtrl: AlertController) {
        this.startForm();
    }

    private startForm() {
        this.cadastroForm = this.fb.group({
            nome: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            email: this.fb.control('', [Validators.required, Validators.email]),
            cep: this.fb.control('', [Validators.required]),
            logradouro: this.fb.control('', [Validators.required]),
            bairro: this.fb.control('', [Validators.required]),
            localidade: this.fb.control('', [Validators.required]),
            uf: this.fb.control('', [Validators.required])
        });
    }       

    private presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Parabéns',
            subTitle: 'Cadastro efetuado com sucesso!',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navCtrl.setRoot(ItemPage);
                    }
                }
            ]
        });
        alert.present();
    }    

    buscarLogradouro() {
        if (this.cadastroForm.value.cep) {
            this.helpProvider.presentLoading("Aguarde buscando endereço");
            this.cadastroProvider.getEnderecoByCEP(this.cadastroForm.value.cep)
                .then(response => {
                    delete response["cep"];
                    this.cadastroForm.patchValue(response);
                    this.helpProvider.closeLoading();
                })
                .catch(error => {
                    this.helpProvider.closeLoading();
                    this.helpProvider.presentLoading("Erro ao buscar os dados do endereço, por favor digite manualmente!");
                })
        } else {
            this.helpProvider.presentToast("Preencha corretamente o CEP para buscar o endereço!");
        }
    }

    validarLength() {
        const cep = this.cadastroForm.value.cep;
        if (cep.length > 8) this.cadastroForm.patchValue({ cep: cep.substring(0, 8) });
    }

    cadastrar() {
        this.helpProvider.presentLoading("Aguarde...");
        const data = this.cadastroForm.value;
        this.cadastroProvider.salvar(data)
            .then((response:any) => {
                setTimeout(() => {
                    window.localStorage.setItem("cadastrado", "true");
                    window.localStorage.setItem("banca", JSON.stringify(response));
                    this.helpProvider.closeLoading();
                    this.presentAlert();
                }, 2000)
            })
            .catch(error => {
                console.error("ERROR ", error);
                this.helpProvider.closeLoading();
            })
    }

}
