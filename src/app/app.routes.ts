import { Routes } from '@angular/router';
import { TopComponent } from './pages/top/top.component'
import { SimpleComponent } from './pages/simple/simple.component';
import { LocateComponent } from './pages/locate/locate.component';

export const routes: Routes = [
  // {
  //   path: '', redirectTo: () => {
  //     return '/ethereum'
  //   }, pathMatch: 'full'
  // },
  // { path: '', redirectTo: redirectToFn, pathMatch: 'full' },
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: 'top', component: TopComponent },
  { path: 'simple', component: SimpleComponent },
  { path: 'location', component: LocateComponent },
];
