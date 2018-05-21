import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroPageModule } from '../pages/cadastro/cadastro.module';
import { ItemPageModule } from '../pages/item/item.module';
import { ItemModalPageModule } from '../pages/item-modal/item-modal.module';

import { CadastroProvider } from '../providers/cadastro/cadastro';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { UnidadeProvider } from '../providers/unidade/unidade';
import { ItemProvider } from '../providers/item/item';

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CadastroPageModule,
        ItemPageModule,
        ItemModalPageModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CadastroProvider,
    CategoriaProvider,
    UnidadeProvider,
    ItemProvider
    ]
})
export class AppModule { }
