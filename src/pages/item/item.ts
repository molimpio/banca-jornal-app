import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Platform} from 'ionic-angular';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { UnidadeProvider } from '../../providers/unidade/unidade';
import { ItemProvider } from '../../providers/item/item';
import { ItemModalPage } from '../item-modal/item-modal';
import { ModalController } from 'ionic-angular';

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
        private toastCtrl: ToastController,
        private itemProvider: ItemProvider) {
    }

    ionViewDidLoad() {
        this.itemProvider.getItens()
            .then((response: any) => this.items = response)
            .catch(error => this.presentToast("Erro ao buscar os itens!"))
    }

    private presentToast(mensagem) {
        let toast = this.toastCtrl.create({
            message: mensagem,
            duration: 5000
        });
        toast.present();
    }

    adicionar() {
        let modal = this.modalCtrl.create(ItemModalPage);
        modal.present();
    }

    remover() {
        console.log("REMOVER")
    }

    editar() {
        console.log("EDITAR")
    }

    sair() {
        this.platform.exitApp();
    }
}
