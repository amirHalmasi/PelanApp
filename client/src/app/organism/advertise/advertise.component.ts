// import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import {
//   ImageDto,
//   UploadFinishedEvent,
// } from './uploadfile/uploadfile.component';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
// import { numberValidator } from 'src/assets/validation/password.validator';
// import { flipInOut, slideRightInOut } from 'src/app/services/animation';
// import { MatSelect } from '@angular/material/select';
// import { NumberToWordsService } from './numberToword.service';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/services/child-route.animation';
import {
  ImageDto,
  UploadFinishedEvent,
} from './uploadfile/uploadfile.component';
import { HttpClient } from '@angular/common/http';
import { filter, Subscription } from 'rxjs';
import { FileUploadservice } from './uploadfile/fileUpload.service';
import { HouseAdvetisePageService } from '../house-page/house-advertise-page.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { NgIf } from '@angular/common';
// interface deleteResponse {
//   folderName: string;
//   deletedFile: string;
//   message: string;
// }
interface fileUploadData {
  imageData: ImageDto[];
  username: string;
  advertiseCode: string;
}
@Component({
    selector: 'app-advertise',
    templateUrl: './advertise.component.html',
    styleUrls: ['./advertise.component.css'],
    animations: [slider],
    standalone: true,
    imports: [
        RouterLinkActive,
        NgIf,
        RouterLink,
        RouterOutlet,
    ],
})
export class AdvertiseComponent implements OnInit, OnDestroy {
  isHouseActive = false;
  icon!: any;
  // imageData: ImageDto[] = [];
  // username!: string;
  // advertiseCode!: string;
  isEditPage_On: boolean = false;
  preRouteUrl!: string;
  routeSubscription$!: Subscription;

  fileUploadData!: fileUploadData;
  currentRoute: string = '';
  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private houseAdvertiseServ: HouseAdvetisePageService,
    private advertiseDataServ: AdvetiseDataService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }
  // url!: string;
  ngOnInit() {
    this.routeSubscription$ = this.advertiseDataServ.previousRouteURL.subscribe(
      {
        next: (preUrl) => {
          preUrl === 'edit/house' || preUrl === 'edit/store'
            ? (this.isEditPage_On = true)
            : (this.isEditPage_On = false);

          this.preRouteUrl = preUrl;
          this.cdr.detectChanges();
        },
      }
    );
    this.icon = faTrash;
    // this.route.url.subscribe((event) => {
    //   console.log(event[0].path);
    //   // this.updateBackground(event[0].path);
    // }); // UrlSegment[]

    // localStorage.clear();
    // authUser ??
    // return data ? JSON.parse(data) : null;
    // this.getProvinceAndCityData();
  }

  // updateBackground(url: string) {
  //   const body = document.body;
  //   console.log(url);
  //   const homeStyles = {
  //     backgroundImage: 'url("../../../assets/backiee-70679.jpg")',
  //     backgroundSize: 'cover',
  //     backgroundRepeat: 'no-repeat',
  //     backgroundPosition: 'center center',
  //   };

  //   const otherRoutes = {
  //     background: 'linear-gradient(#ffffff, #c5c5c5, #a7a7a7) !important',
  //   };

  //   if (url !== 'home') {
  //     this.removeStyles(body, homeStyles);
  //     this.applyStyles(body, otherRoutes);
  //   } else {
  //     this.removeStyles(body, homeStyles);
  //     // this.applyStyles(body, otherRoutes);
  //   }
  // }

  // private applyStyles(element: HTMLElement, styles: { [key: string]: string }) {
  //   for (const [key, value] of Object.entries(styles)) {
  //     this.renderer.setStyle(element, key, value);
  //   }
  // }

  // private removeStyles(
  //   element: HTMLElement,
  //   styles: { [key: string]: string }
  // ) {
  //   for (const key of Object.keys(styles)) {
  //     this.renderer.removeStyle(element, key);
  //   }
  // }

  // ngOnInit(): void {

  // }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
  goBackToAllAdvertises() {
    this.houseAdvertiseServ.advertiseItem = '';
    // this.advertiseDataServ.previousRouteURL.next('');
    if (this.preRouteUrl === 'edit/house') {
      this.router.navigate(['/myAdvertises', 'userHouseAdvertises']);
      this.advertiseDataServ.previousRouteURL.next('');
    } else if (this.preRouteUrl === 'edit/store') {
      this.router.navigate(['/myAdvertises', 'userStoreAdvertises']);
      this.advertiseDataServ.previousRouteURL.next('');
    }
  }
}
