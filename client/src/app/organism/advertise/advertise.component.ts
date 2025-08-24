// import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
  RouterLinkActive,
  RouterLink,
} from '@angular/router';
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
  imports: [RouterLinkActive, NgIf, RouterLink, RouterOutlet],
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
  }

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
