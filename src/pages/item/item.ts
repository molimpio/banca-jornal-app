import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-item',
    templateUrl: 'item.html',
})
export class ItemPage {

    banca: any

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.banca = window.localStorage.getItem("banca");
        console.log('ionViewDidLoad ItemPage');
    }

}
