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
import { LoadingController } from 'ionic-angular';

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
    loader: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
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
        this.presentLoading("Aguarde...");
        this.itemForm.value.categoria = {id: this.itemForm.value.categoria};
        this.itemForm.value.unidade = {id: this.itemForm.value.unidade};
        
        console.log("DADOS FORM ", this.itemForm.value);
        this.itemProvider.salvar(this.itemForm.value)
            .then(response => {
                this.loader.dismiss();
                this.presentAlert();
            })
            .catch(error => {
                console.log("ERROR ",error)
                this.loader.dismiss();
            })        
    }

    lerQrCode() {
        this.barcodeScanner.scan()
            .then(barcodeData => {
                this.itemForm.patchValue(JSON.parse(barcodeData.text))
                console.log("DADOS LIDOS ", barcodeData)
            })
            .catch(err => console.log('Error', err));
    }

    voltar() {
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
                        this.voltar();
                    }
                }
            ]
        });
        alert.present();
    }

    private presentLoading(mensagem) {
        this.loader = this.loadingCtrl.create({
            content: mensagem
        });
        this.loader.present();
    }

}
