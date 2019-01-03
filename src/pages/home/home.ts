import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ModalController } from "ionic-angular";
import { MapPage } from "./../map/map";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  busStop;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController //public db: AngularFireDatabase
  ) {}

  next() {
    const modal = this.modalCtrl.create(MapPage);
    modal.present();
  }
}
