import {ClubComponent} from './football/club.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ClubDetailComponent} from './football/club-detail/club-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'club', component: ClubComponent},
  {path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: ClubDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
