import {Component, OnInit} from '@angular/core';
import {Club} from '../football/club';
import {ClubService} from '../service/club.service';

@Component({
  selector: 'app-football',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  clubs: Club[];

  constructor(private clubService: ClubService) {
  }

  ngOnInit() {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getClubs().subscribe(clubs => this.clubs = clubs);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return; }
    this.clubService.addClub({name} as Club)
      .subscribe(club => {
        this.clubs.push(club);
      });
  }

  delete(club: Club): void {
    this.clubs = this.clubs.filter(h => h !== club);
    this.clubService.deleteClub(club).subscribe();
  }
}
