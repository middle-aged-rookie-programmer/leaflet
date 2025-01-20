import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
    selector: 'app-top',
    imports: [],
    templateUrl: './top.component.html',
    styleUrl: './top.component.scss'
})
export class TopComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void { }

  GoSimplePage() {
    this.router.navigate(['/simple'])
  }

  GoLocationPage() {
    this.router.navigate(['/location'])
  }
}
