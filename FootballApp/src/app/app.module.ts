import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ClubComponent} from './football/club.component';
import {ClubDetailComponent} from './football/club-detail/club-detail.component';

import {ClubService} from '../app/service/club.service';
import {MessageService} from '../app/service/message.service';
import {MessageComponent} from './football/message/message.component';
import {AppRoutingModule} from './/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service/in-memory-data.service';
import {ClubSearchComponent} from './football/club-search/club-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubComponent,
    ClubDetailComponent,
    MessageComponent,
    DashboardComponent,
    ClubSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [
    ClubService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
