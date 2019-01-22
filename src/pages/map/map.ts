import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from '@angular/common/http';

import L from "leaflet";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  map;
  private markerStop;
  private idStop;
  private address = "localhost";
  private temps: any = "";
  private depart = "Station de départ";
  private arrive = "Station d'arrivée";
  private busno = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

  }

  ionViewDidLoad() {


    this.temps = "...";
    this.idStop = this.navParams.data['idStop'];
    console.log("Numero de depart : " + this.idStop);

    if (!this.map) {
      this.loadMap();
    }
  }


  loadMap() {
    this.map = L.map("mapid");
    this.map.on("load", this.onMapLoad);
    this.map.setView([43.6989557997, 7.2696800568], 16);

    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
    L.tileLayer(
      "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvZmZyZXktMyIsImEiOiJjam1oaGt4anYxYW53M3V0ODBrY2ptY2wzIn0.m13RSCPj-ck2-ynQ2M2HnA",
      {
        maxZoom: 18,
        attribution: "NfcBus",
        id: "mapbox.streets"
      }
    ).addTo(this.map);

    // 82.253.136.83
    this.http.get("http://" + this.address + ":3000/stop?id=" + this.idStop).subscribe(
      response => {
        console.log(response);

        let lat = response["result"][0]["stop_lat"];
        let long = response["result"][0]["stop_lon"];
        let name = response["result"][0]["stop_name"];
        this.addMarkerToMap(lat, long, name);
        this.depart = name;
      }
    )

    this.map.on('click', (e) => this.onMapClick(e));

    this.map.on()


  }

  getTime(dep: string) {

    let res = "";
    var timeStart = new Date();

    var timeEnd = new Date("01/01/2007 " + dep)
    let hour = timeEnd.getHours() - timeStart.getHours();
    let minutes = timeEnd.getMinutes() - timeStart.getMinutes();
    if (hour > 0) {
      res += hour + "h"
    }
    res += minutes;

    return res;
  }


  addMarkerToMap(lat: number, long: number, stop_name: string) {
    L.marker([lat, long]).bindPopup('<b>Arret</b> </br>' + stop_name)
      .openPopup().addTo(this.map);
  }

  addMarkerStopToMap(lat: number, long: number, stop_name: string) {
    this.markerStop = L.marker([lat, long]);
    this.markerStop.bindPopup('<b>Arret</b> </br>' + stop_name)
      .openPopup().addTo(this.map);
  }

  onMapClick(e) {
    let popup = L.popup();
    popup.setLatLng(e.latlng)
      .setContent("On y va ? " + '<ion-button></ion-button>')
      .openOn(this.map);

    console.log("http://" + this.address + ":3000/nearestBusStop?long=" + e.latlng.lng + "&lat=" + e.latlng.lat + "&stop=911");
    // http://192.168.1.14:3000/nearestBusStop    

    this.temps = "...";

    '<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" alt="loading">'
    this.arrive = "...";
    this.http.get("http://" + this.address + ":3000/nearestBusStop?long=" + e.latlng.lng + "&lat=" + e.latlng.lat + "&stop=911").subscribe(
      (response) => {
        console.log(response);
        if (this.markerStop) {
          this.map.removeLayer(this.markerStop);
        }
        let lat = response["result"]["stop_lat"];
        let long = response["result"]["stop_lon"];
        let name = response["result"]["stop_name"];
        this.addMarkerStopToMap(lat, long, name);


        this.busno = response["result"]["route_short_name"];
        this.temps = this.getTime(response["result"]["departure_time"]);
        this.arrive = name;

        this.map.closePopup();

      }
    );

    //    alert("You clicked the map at " + e.latlng);
  }


  onMapLoad() {
    if (document.getElementById("mapid")) {
      document.getElementById("mapid").style.position = "sticky";
    }
  }

  closeInfo() {
    document.getElementById("info").style.display = "none";
  }
}
