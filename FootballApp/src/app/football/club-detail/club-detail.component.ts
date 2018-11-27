import {Component, OnInit, Input} from '@angular/core';
import {Club} from '../club';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ClubService} from '../../service/club.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  @Input() club: Club;

  getClub(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clubService.getClub(id).subscribe(club => this.club = club);
  }

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getClub();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.clubService.updateClub(this.club).subscribe(() => this.goBack());
  }
}
