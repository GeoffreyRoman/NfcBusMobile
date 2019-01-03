import { AngularFireDatabase } from "angularfire2/database";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ModalController } from "ionic-angular";
import { MapPage } from "./../map/map";
import { AngularFireModule } from "angularfire2";
// for AngularFireDatabase
import { AngularFireDatabaseModule } from "angularfire2/database";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  busName = [];
  stopName = [];
  jointure = [];
  result;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public db: AngularFireDatabase
  ) {
    this.loadBusName();
    this.loadStopName();
    this.loadJointure();
    console.log(this.busName);
    console.log(this.stopName);
  }

  loadBusName() {
    // busName == routes
    var leadsRef = this.db.database.ref().child("busName");
    leadsRef.on("value", snapshot => {
      snapshot.forEach(snapshot => {
        var obj = snapshot.val();
        this.busName.push(obj);
      });
    });
  }

  loadStopName() {
    var leadsRef = this.db.database.ref().child("stopName");
    leadsRef.on("value", snapshot => {
      snapshot.forEach(snapshot => {
        var obj = snapshot.val();
        this.stopName.push(obj);
      });
    });
  }

   loadJointure() {
    var leadsRef = this.db.database.ref().child("jointure");
    leadsRef.on("value", snapshot => {
      snapshot.forEach(snapshot => {
        var obj = snapshot.val();
        this.jointure.push(obj);
      })
      this.result = this.merge(this.jointure, this.busName);
        console.log(this.result);
        console.log("then");
        
    });
  }

merge() {
var destination = {},
    sources = [].slice.call( arguments, 0 );
sources.forEach(function( source ) {
    var prop;
    for ( prop in source ) {
        if ( prop in destination && Array.isArray( destination[ prop ] ) ) {

            // Concat Arrays
            destination[ prop ] = destination[ prop ].concat( source[ prop ] );

        } else if ( prop in destination && typeof destination[ prop ] === "object" ) {

            // Merge Objects
            destination[ prop ] = merge( destination[ prop ], source[ prop ] );

        } else {

            // Set new values
            destination[ prop ] = source[ prop ];

        }
    }
});
return destination;
};
  download(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "all.json");
  dlAnchorElem.click();
  }

  next() {
    const modal = this.modalCtrl.create(MapPage);
    modal.present();
  }
}
