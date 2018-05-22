import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { UnidadeProvider } from '../../providers/unidade/unidade';
import { ItemProvider } from '../../providers/item/item';
import { ItemModalPage } from '../item-modal/item-modal';
import { ModalController } from 'ionic-angular';
import { HelpProvider } from '../../providers/help/help';

@IonicPage()
@Component({
    selector: 'page-item',
    templateUrl: 'item.html',
})
export class ItemPage {

    items: Item[] = [];

    constructor(private navCtrl: NavController,
        private platform: Platform,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private helpProvider: HelpProvider,
        private itemProvider: ItemProvider) {

        this.buscarItens();
        this.itemProvider.atualizarListaItensEv.subscribe(() => this.buscarItens());
    }

    buscarItens() {
        this.helpProvider.presentLoading("Aguarde, buscando itens!");
        this.itemProvider.getItens()
            .then((response: any) => {
                this.items = response;
                this.helpProvider.closeLoading();
            })
            .catch(error => {
                this.helpProvider.closeLoading();
                this.helpProvider.presentToast("Erro ao buscar os itens!");
            })
    }

    adicionar() {
        let modal = this.modalCtrl.create(ItemModalPage);
        modal.present();
    }

    remover(id) {
        console.log("REMOVER ", id);
        // passar o id do item a ser removido
    }

    editar(item) {
        console.log("EDITAR ", item);
        /**
         * {
	"codigo": "222",
	"categoria" : {"id" : 1},
	"unidade" : {"id" : 1},
	"banca" : {"id" : 1},
	"descricao": "teste de update de item22222",
	"qtde": 100222222
}
         */
    }

    sair() {
        this.platform.exitApp();
    }
}
