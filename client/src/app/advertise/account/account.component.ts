import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertiseService } from './advertise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy {
  createdAdvertiseType: string;
  queryParams: Subscription;
  title!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private advertiseServ: AdvertiseService
  ) {
    this.navigateTo('rentHome');
  }
  ngOnDestroy(): void {
    this.queryParams.unsubscribe();
    //comment to see what will happen
  }

  ngOnInit(): void {
    this.queryParams = this.advertiseServ.getQueryParams().subscribe({
      next: (res) => {
        this.advertiseServ.createdAdvertiseType = this.createdAdvertiseType =
          res;
        console.log(
          'service this.advertiseServ.createdAdvertiseType',
          this.advertiseServ.createdAdvertiseType
        );
        this.setTitle(this.advertiseServ.createdAdvertiseType);
      },
    });
  }

  setTitle(routQuery: string) {
    switch (routQuery) {
      case 'sellHome':
        this.title = 'ثبت آگهی فروش ملک در';
        break;
      case 'rentHome':
        this.title = 'ثبت آگهی اجاره ملک در';
        break;
      case 'rentShop':
        this.title = 'ثبت آگهی اجاره مغازه در';
        break;
      case 'sellShop':
        this.title = 'ثبت آگهی فروش مغازه در';
        break;
    }
  }

  navigateTo(advertiseType: string) {
    this.router.navigate(['../createAdvertise'], {
      relativeTo: this.route,
      queryParams: { 'advertise-type': advertiseType },
    });
  }
}
