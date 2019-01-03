import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 
import L from "leaflet";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){

    this.map = L.map('mapid').setView([43.710175, 7.261953], 16);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvZmZyZXktMyIsImEiOiJjam1oaGt4anYxYW53M3V0ODBrY2ptY2wzIn0.m13RSCPj-ck2-ynQ2M2HnA', {
        maxZoom: 18,
        attribution: 'HappyMem',
        id: 'mapbox.streets'
    }).addTo(this.map);

}

}
