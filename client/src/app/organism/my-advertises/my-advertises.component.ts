import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-my-advertises',
    templateUrl: './my-advertises.component.html',
    styleUrls: ['./my-advertises.component.css'],
    standalone: true,
    imports: [
        RouterLinkActive,
        RouterLink,
        RouterOutlet,
    ],
})
export class MyAdvertisesComponent implements OnInit {
  constructor(private http: HttpClient) {}
  advertisesUrl = 'https://localhost:5001/api/account/allAdvertises/' + '4271377953';
  ngOnInit(): void {
    this.http
      .get<any>(
        this.advertisesUrl
        // , { headers }
      )
      .subscribe((data) => {
        console.log('data', data);
      });
  }
}
