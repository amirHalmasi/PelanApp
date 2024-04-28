import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UploadandremoveadvService } from 'src/app/shared/uploadandremoveadv.service';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  advertiseImages: string[] = [];
  advertiseData!: any;
  advertiseImagesObservable$: Observable<string[]>;
  isLoadingImage!: boolean;
  constructor(
    private uploadAndRemoveServ: UploadandremoveadvService,
    private cardDataServ: CardService
  ) {}
  ngOnInit() {
    this.cardDataServ
      .getAdvertiseDataHttp(
        'https://localhost:5001/api/Advertise/getAdvertises'
      )
      // .pipe(map((data) => data['advertises']))
      .subscribe({
        next: (data) => {
          this.cardDataServ.allAdvertisesData$ = of(data);
          // console.log(JSON.stringify(data[4]));
        },
        error: (error) => {
          console.log(error.error);
        },
        complete: () => {
          this.cardDataServ.allAdvertisesData$.subscribe((values) => {
            console.log(values[2]);
            this.advertiseData = values;
            console.log(values[2]['cityId']);
          });
        },
      });
  }
  // getImages() {
  //   this.isLoadingImage = true;
  //   let imagesResponse!: string[];
  //   this.uploadAndRemoveServ
  //     .GetImages(this.loggedUserData.username, this.advertiseCode)
  //     .subscribe({
  //       next: (imageBase64List: string[]) => {
  //         console.log('Remaining images:', imageBase64List);
  //         if (imageBase64List.length > 0) {
  //           // this.advertiseImages = imageBase64List.map((imageBase64) => {
  //           imagesResponse = imageBase64List.map((imageBase64) => {
  //             return 'data:image/png;base64, ' + imageBase64;
  //           });
  //         }
  //         console.log('imagesResponse', imagesResponse);
  //         this.advertiseImagesObservable$ = of(imagesResponse);
  //       },
  //       error: (error) => {
  //         console.error('Error getting remaining images:', error);
  //       },
  //       complete: () => {
  //         this.isLoadingImage = false;
  //         this.advertiseImagesObservable$.subscribe((values) => {
  //           console.log('get images advertise Images complete part:', values);
  //           this.advertiseImages = values;
  //         });
  //       },
  //     });
  // }
}
