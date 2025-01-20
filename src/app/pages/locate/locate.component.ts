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
export class LocateComponent implements OnInit {
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
      }
    })
      .addTo(this.map);

    this.map.start();

    // this.map.locate({ setView: true, maxZoom: 16 });

    this.map.on('locationfound', this.OnLocationFound);
    this.map.on('locationerror', this.OnLocationError);
  }

  OnLocationFound(e: any) {
    let radius = e.accuracy;

    L.marker(e.latlng).addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
  }

  OnLocationError(e: any) {
    alert(e.message);
  }


}
