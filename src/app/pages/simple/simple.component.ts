import { Component, EventEmitter, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
    selector: 'app-simple',
    imports: [],
    templateUrl: './simple.component.html',
    styleUrl: './simple.component.scss'
})
export class SimpleComponent implements OnInit {
  ngOnInit(): void {

    // let map = L.map('map').setView([34.702485, 135.495951], 13); // London
    let map = L.map('map').setView([35.6789, 139.7663], 13); // Tokyo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // L.marker([51.5, -0.09]).addTo(map) // London
    L.marker([35.6789, 139.7663]).addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
    map.addEventListener("click", function (e) {
      console.log(e)
      map.setView([e.latlng.lat, e.latlng.lng], 13)
    })
  }

}
