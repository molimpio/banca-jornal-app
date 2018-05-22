import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Categoria } from '../../models/item.model';
import { Unidade } from '../../models/unidade.model';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { UnidadeProvider } from '../../providers/unidade/unidade';
import { ItemProvider } from '../../providers/item/item';
import { AlertController } from 'ionic-angular';
import { HelpProvider } from '../../providers/help/help';

@IonicPage()
@Component({
    selector: 'page-item-modal',
    templateUrl: 'item-modal.html',
    providers: [BarcodeScanner]
})
export class ItemModalPage {

    itemForm: FormGroup;
    categorias: Array<Categoria> = [];
    unidades: Array<Unidade> = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private helpProvider: HelpProvider,
        private categoriaProvider: CategoriaProvider,
        private itemProvider: ItemProvider,
        private fb: FormBuilder,
        private barcodeScanner: BarcodeScanner,
        private unidadeProvider: UnidadeProvider) {
        this.startForm();
    }

    ionViewDidLoad() {
        this.categoriaProvider.getCategorias().subscribe(categorias => this.categorias = categorias);
        this.unidadeProvider.getUnidades().subscribe(unidades => this.unidades = unidades);
    }

    private startForm() {
        this.itemForm = this.fb.group({
            codigo: this.fb.control('', [Validators.required]),
            categoria: this.fb.control('', [Validators.required]),
            unidade: this.fb.control('', [Validators.required]),
            descricao: this.fb.control('', [Validators.required]),
            qtde: this.fb.control('', [Validators.required])
        });
    }

    cadastrarItem() {
        this.helpProvider.presentLoading("Aguarde...");
        this.itemForm.value.categoria = { id: this.itemForm.value.categoria };
        this.itemForm.value.unidade = { id: this.itemForm.value.unidade };

        const data = this.itemForm.value;
        const banca = JSON.parse(window.localStorage.getItem("banca"));
        data.banca = {id: banca.id};

        this.itemProvider.salvar(data)
            .then(response => {
                this.helpProvider.loader.dismiss();
                this.presentAlert();
            })
            .catch(error => {
                this.helpProvider.presentToast("Erro ao cadastrar item!");
                this.helpProvider.loader.dismiss();
            })
    }

    lerQrCode() {
        this.barcodeScanner.scan()
            .then(barcodeData => this.itemForm.patchValue(JSON.parse(barcodeData.text)))
            .catch(err => this.helpProvider.presentToast("Erro ao ler qrcode!"));
    }

    voltar() {
        this.itemProvider.atualizarListaItens();
        this.navCtrl.pop();
    }

    private presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Parabéns',
            subTitle: 'Item cadastrado com sucesso!',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.itemForm.reset();
                    }
                }
            ]
        });
        alert.present();
    }

}
