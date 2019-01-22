import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ModalController } from "ionic-angular";
import { MapPage } from "./../map/map";


import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  busStop;
  private listener: Subscription;



  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private nfc: NFC,
    private ndef: Ndef, //public db: AngularFireDatabase
  ) { }



  ionViewWillEnter() {
    this.listener = this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe(

      (event) => {
        console.log('received ndef message. the tag contains: ', event.tag);
        console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
        let some_value = event.tag.ndefMessage[0]["payload"];
        console.log(event.tag.ndefMessage);



        let message = this.ndef.textRecord('{"idStop":5004}');
        this.nfc.write([message]).then(() => { console.log('Message transfere'); }
        ).catch(() => {
          console.log('error');
        });

        let string_value = this.nfc.bytesToString(some_value);
        string_value = string_value.substr(3);
        console.log(string_value);
        let idStop = JSON.parse(string_value)['idStop'];



        this.navCtrl.push(MapPage, { idStop: parseInt(idStop) });



        console.log('^^^^^');




      });
  }


  ionViewWillLeave() {
    if (this.listener) {
      this.listener.unsubscribe();
      console.log("desinscrit");

    }
  }


  next() {
    this.navCtrl.push(MapPage, { idStop: 911 });
  }


}
