import { Component, OnInit } from '@angular/core';

import { ModalServiceService } from '../services/modal-service.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('changeButtonClass', [
      state('initial', style({ transform: 'rotateX(0deg)', opacity: 1 })),
      state('final', style({ transform: 'rotateX(360deg)', opacity: 1 })),
      transition('initial <=> final', animate('200ms ease-in')),
    ]),
  ],
})
export class NavBarComponent implements OnInit {
  isCollapsed: boolean = true;
  isModalOpen: boolean = false;
  cityData!: any;
  buttonState: string = 'initial';

  constructor(
    private modalServ: ModalServiceService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.modalServ.isCollapsed.subscribe((iscolaps) => {
      this.isCollapsed = iscolaps;
    });
    this.modalServ.selectedCity.subscribe((selectedCtData) => {
      console.log('nav bar selected ct data', selectedCtData);
      this.cityData = selectedCtData;
      this.buttonState = this.buttonState === 'initial' ? 'final' : 'initial';
    });
  }

  openModal() {
    this.buttonState = 'initial';
    this.modalServ.openModal();
  }
  logout() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    this.http
      .post('https://localhost:5001/api/account/logout', {}, { headers })
      .subscribe({
        next: (res) => {
          console.log(res);
          // alertify.success('Logged out successfully');
          localStorage.removeItem('authToken'); // Remove the token from local storage or wherever it's stored
          this.router.navigate(['/login']); // Navigate to the login page or home page
        },
        error: (err) => {
          // alertify.error('Logout failed: ' + err.message);
        },
      });
  }
}
