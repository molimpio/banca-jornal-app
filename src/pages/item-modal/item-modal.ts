import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Categoria } from '../../models/item.model';
import { Unidade } from '../../models/unidade.model';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { UnidadeProvider } from '../../providers/unidade/unidade';

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
    texto: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private categoriaProvider: CategoriaProvider,
        private fb: FormBuilder,
        private barcodeScanner: BarcodeScanner,
        private unidadeProvider: UnidadeProvider) {
        this.startForm();
    }

    ionViewDidLoad() {
        this.categoriaProvider.getCategorias().subscribe(categorias => this.categorias = categorias);
        this.unidadeProvider.getUnidades().subscribe(unidades => this.unidades = unidades);
        console.log('DADOS ', this.unidades, this.categorias);
    }

    private startForm() {
        this.itemForm = this.fb.group({
            codigo: this.fb.control('', [Validators.required]),
            categoria: this.fb.control('', [Validators.required]),
            unidade: this.fb.control('', [Validators.required]),
            descricao: this.fb.control('', [Validators.required]),
            quantidade: this.fb.control('', [Validators.required])
        });
    }

    cadastrarItem() {
        /**
         * {
	"codigo": "001",
	"categoria" : {"id" : 1},
	"unidade" : {"id" : 1},
	"banca" : {"id" : 1},
	"descricao": "teste de insert de item",
	"qtde": 10
}
         */
        console.log("DADOS FORM ", this.itemForm.value);
        //this.navCtrl.pop();
    }

    lerQrCode() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            this.texto = barcodeData;
           }).catch(err => {
               console.log('Error', err);
               this.texto = err;
           });
    }

    voltar() {
        this.navCtrl.pop();
    }

}
