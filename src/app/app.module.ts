import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import {NewsClientComponent} from './news-client/news-client.component';
import {TurnClientComponent} from './turn-client/turn-client.component';
import {GotClientComponent} from './got-client/got-client.component';
import {ProfClientComponent} from './prof-client/prof-client.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {YellowClientsComponent} from './yellow-clients/yellow-clients.component';

import {ROUTES} from './app.routes';
import {LoginClientComponent} from './login-client/login-client.component';
import {ClientService} from './client.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InterceptorModule } from './auth.interceptor';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsClientComponent,
    TurnClientComponent,
    GotClientComponent,
    ProfClientComponent,
    NewsDetailComponent,
    YellowClientsComponent,
    LoginClientComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    InterceptorModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
