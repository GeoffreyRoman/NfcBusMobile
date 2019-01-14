import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { MapPage } from "../pages/map/map";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HttpClientModule } from '@angular/common/http';

import { NFC, Ndef} from '@ionic-native/nfc';

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HomePage, MapPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule,],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, MapPage],
  providers: [
    NFC,
    Ndef,
    
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
