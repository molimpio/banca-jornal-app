import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class HelpProvider {

    loader: any;

    constructor(private toastCtrl: ToastController,
        private loadingCtrl: LoadingController) { }

    public presentToast(mensagem) {
        let toast = this.toastCtrl.create({
            message: mensagem,
            duration: 5000
        });
        toast.present();
    }

    public presentLoading(mensagem) {
        this.loader = this.loadingCtrl.create({
            content: mensagem
        });
        this.loader.present();
    }

    public closeLoading() {
        this.loader.dismiss();
    }
}
