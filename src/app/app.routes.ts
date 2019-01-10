import {Routes} from '@angular/router';
import {LoginClientComponent} from './login-client/login-client.component';
import {NewsClientComponent} from './news-client/news-client.component';
import {LayoutComponent} from './layout/layout.component';
import {TurnClientComponent} from './turn-client/turn-client.component';
import {GotClientComponent} from './got-client/got-client.component';
import {YellowClientsComponent} from './yellow-clients/yellow-clients.component';
import {ProfClientComponent} from './prof-client/prof-client.component';

export const ROUTES: Routes = [
  {path: 'login', component: LoginClientComponent},
  // { path: '**', redirectTo: '/client'},
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: NewsClientComponent },
      { path: 'turn', component: TurnClientComponent },
      { path: 'clients', component: GotClientComponent },
      { path: 'yellow-clients', component: YellowClientsComponent },
      { path: 'prof', component: ProfClientComponent }
    ]
  },

];
