import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProvinceAndCitiesService } from 'src/app/home/province-and-cities-service.service';
import { CanDeactivateType } from 'src/app/shared/checkout.guard';
import { City } from 'src/app/shared/citiy.model';
import { Rent } from 'src/app/shared/rent.model';

import { SweetAlertService } from 'src/app/shared/sweet-alert.service';
import { CardService } from './card/card.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css',
})
export class RentComponent implements OnInit {
  loadedRentAdvertises: Rent[] = [
    {
      id: 5770,
      buildingAge: '5 سال',
      direction: 'شمالی',

      advertiseType: 'rent',

      mortgagePrice: '50000000',

      rentPrice: '1000000',
      mobileAdvertiser: '09199805397',
      isShowMobile: false,
      roomCount: 2,
      isJustForFamily: true,
      description:
        'این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.',
      haveParking: false,
      advertiserAddress: 'کوی اندیشه خیابان ملاصدرا',
      advertiserShopName: 'بهار',
      tels: '33762539',
      rate: null,
      email: null,
      imagesPath: [
        '4271377953/5770/_large_image_2',
        '4271377953/5770/_large_image_1',
        '4271377953/5770/images-1',
        '4271377953/5770/images-2',
      ],
    },
    {
      id: 9846,
      buildingAge: '4 سال',
      direction: 'شمالی',

      advertiseType: 'rent',

      mortgagePrice: '150000000',

      rentPrice: '3000000',
      mobileAdvertiser: '09199805397',
      isShowMobile: true,

      roomCount: 1,
      isJustForFamily: true,
      description:
        'این ملک در خیابان 30 متری اندیشه و کاغذدیواری و کف سرامیک میباشد.',
      haveParking: false,
      advertiserAddress: 'کوی اندیشه خیابان ملاصدرا',
      advertiserShopName: 'بهار',
      tels: '33762539',
      rate: null,
      email: null,
      imagesPath: [
        '4271377953/5770/_large_image_2',
        '4271377953/5770/_large_image_1',
        '4271377953/5770/images-21',
        '4271377953/5770/images-20',
      ],
    },
  ];
  title = 'پلان';
  isModalOpen: boolean = false;
  selectedCityInfo?: City;
  isDatailes: boolean = false;
  selectedCity!: City;

  constructor(
    // private activeRoute: ActivatedRoute,
    private provinceAndCityServ: ProvinceAndCitiesService,
    private sweetAlert: SweetAlertService,
    private cardDataServ: CardService,
    private http: HttpClient // private router: Router, // private route: ActivatedRoute
  ) {
    this.provinceAndCityServ.selectedCity.subscribe({
      next: (city: City) => {
        console.log(city);

        this.selectedCity = city;
        // this.cdr.detectChanges;
      },
    });
    console.log(this.provinceAndCityServ.city);
  }
  ngOnInit(): void {
    this.provinceAndCityServ.onCloseCityModal.subscribe({
      next: (isOpen) => (this.isModalOpen = isOpen),
    });
  }

  // canDeactivateFn(): CanDeactivateType {
  //   if (!this.selectedCity) {
  //     return true;
  //   }

  //   if (this.selectedCity) {
  //     return new Promise<boolean>((resolve) => {
  //       this.sweetAlert
  //         .confirm(
  //           'مطمئنی بدون ثبت نام میخوای بری؟',
  //           'خروج بدون ثبت نام',
  //           'question',
  //           'custome-font'
  //         )
  //         .then((result) => {
  //           // console.log('sweetalert result');
  //           // console.log(result);
  //           resolve(result.isConfirmed); // Resolve with the user's choice
  //         })
  //         .catch(() => {
  //           resolve(false); // In case of an error, consider it as not confirmed
  //         });
  //     });
  //   }
  // }
}
