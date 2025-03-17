import { Component, EventEmitter, OnInit } from '@angular/core';
import { LocateControl } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import * as L from 'leaflet';

@Component({
  selector: 'app-locate',
  imports: [],
  templateUrl: './locate.component.html',
  styleUrl: './locate.component.scss'
})

// // 参考
// https://four4to6.x0.com/1403/
// https://kita-note.com/leaflet-plugin-locatecontrol
export class LocateComponent implements OnInit {

  marker: L.Marker | undefined;
  circle: L.Circle | undefined;
  map: any;
  ngOnInit(): void {
    this.map = L.map('map').fitWorld();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map = new LocateControl({
      position: "topright",
      strings: {
        title: "Show me where I am, yo!"
      },
      locateOptions: {
        enableHighAccuracy: true
      }
    }).addTo(this.map);


    this.map.start();

    // this.map.locate({ setView: true, maxZoom: 16 });

    // this.map.on('locationfound', this.OnLocationFound);
    this.map.on('locationfound', (e: any) => this.OnLocationFound(e));
    this.map.on('locationerror', this.OnLocationError);
  }

  OnLocationFound(e: any) {
    //// 動きがかくかく。。
    // let radius = e.accuracy;

    // L.marker(e.latlng).addTo(this.map)
    //   .bindPopup("You are within " + radius + " meters from this point").openPopup();

    // L.circle(e.latlng, radius).addTo(this.map);


    const radius = e.accuracy / 2; // Use half the accuracy as radius for the circle

    if (this.marker && this.marker != undefined) {
      // Marker exists, just update its position and popup
      this.marker.setLatLng(e.latlng);
      const tmp = this.marker.getPopup()
      if (tmp != undefined) {
        tmp.setContent("You are within " + radius + " meters from this point");
      }
    } else {
      // Create a new marker and circle since it doesn't exist yet
      this.marker = L.marker(e.latlng).addTo(this.map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
    }

    if (this.circle) {
      // Circle exists, just update its position and radius
      this.circle.setLatLng(e.latlng).setRadius(radius);
    } else {
      // Create a new circle since it doesn't exist yet
      this.circle = L.circle(e.latlng, { radius }).addTo(this.map);
    }
  }

  OnLocationError(e: any) {
    alert(e.message);
  }


}
