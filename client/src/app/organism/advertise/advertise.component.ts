// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/services/child-route.animation';
import {
  ImageDto,
  UploadFinishedEvent,
} from './uploadfile/uploadfile.component';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';
import { FileUploadservice } from './uploadfile/fileUpload.service';
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
})
export class AdvertiseComponent implements OnInit {
  isHouseActive = false;
  icon!: any;
  // imageData: ImageDto[] = [];
  // username!: string;
  // advertiseCode!: string;

  fileUploadData!: fileUploadData;
  currentRoute: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private fileUploadServ: FileUploadservice
  ) {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     console.log(event);
    //     // this.currentRoute = event.urlAfterRedirects.split('/').pop() || '';
    //   });
  }
  // isActive(route: string) {
  //   // return this.currentRoute === route;
  // }
  // navigateTo(routAddress: string) {
  //   this.router.navigate([routAddress], {
  //     relativeTo: this.activeRoute,
  //     state: {
  //       username: this.fileUploadData?.username,
  //       advertiseCode: this.fileUploadData?.advertiseCode,
  //       imageData: this.fileUploadData?.imageData,
  //     },
  //   });
  // }
  // /////////////////////////////////////////////
  // public uploadFinish = (event: UploadFinishedEvent) => {
  //   // this.imageData = event.imageData;
  //   // this.username = event.username;
  //   // this.advertiseCode = event.advertiseCode;
  //   this.fileUploadData = {
  //     imageData: event.imageData,
  //     username: event.username,
  //     advertiseCode: event.advertiseCode,
  //   };
  //   console.log('uploadFinish', event);
  //   console.log('FileUploadFinish', this.fileUploadData);
  //   console.log('event uploaded finish', event);
  // };

  // createImagePath(serverPath: string) {
  //   serverPath = serverPath.replace(/\\/g, '/');
  //   return `https://localhost:5001/${serverPath}`;
  // }
  // deleteAllImages() {
  //   const authUser = JSON.parse(
  //     localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
  //   );
  //   // console.log(authUser.token);
  //   const headers = {
  //     Authorization: `Bearer ${authUser.token}`,
  //   };
  //   this.http
  //     .delete(
  //       `https://localhost:5001/api/upload/deleteAllImages?username=${this.getUsername()}&advertiseCode=${this.getAdvertiseCode()}`,
  //       { headers: headers }
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         console.log('delete Image response', res);
  //         // Remove the deleted image from imageData array
  //         this.fileUploadData.imageData = [];
  //         console.log(
  //           'this.imageData delete function next',
  //           this.fileUploadData.imageData
  //         );
  //       },
  //       error: (error) => {
  //         console.error('Error deleting image:', error);
  //         // Handle error
  //       },
  //       complete: () => {
  //         console.log(
  //           'this.imageData delete function complete',
  //           this.fileUploadData.imageData
  //         );
  //         this.fileUploadServ.uploadedImageData.next({
  //           ...this.fileUploadData,
  //           imageData: this.fileUploadData.imageData,
  //         });
  //       },
  //     });
  // }
  // deleteImage(image: ImageDto) {
  //   const authUser = JSON.parse(
  //     localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
  //   );
  //   // console.log(authUser.token);
  //   const headers = {
  //     Authorization: `Bearer ${authUser.token}`,
  //   };
  //   this.http
  //     .delete(
  //       `https://localhost:5001/api/upload/delete?username=${this.getUsername()}&advertiseCode=${this.getAdvertiseCode()}&fileName=${
  //         image.fileName
  //       }`,
  //       { headers: headers }
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         console.log('deleteImage response', res);
  //         // Remove the deleted image from imageData array
  //         this.fileUploadData.imageData = this.fileUploadData.imageData.filter(
  //           (img) => img.dbPath !== image.dbPath
  //         );
  //         console.log(
  //           'this.imageData delete function next',
  //           this.fileUploadData.imageData
  //         );
  //       },
  //       error: (error) => {
  //         console.error('Error deleting image:', error);
  //         // Handle error
  //       },
  //       complete: () => {
  //         console.log(
  //           'this.imageData delete function complete',
  //           this.fileUploadData.imageData
  //         );
  //         this.fileUploadServ.uploadedImageData.next({
  //           ...this.fileUploadData,
  //           imageData: this.fileUploadData.imageData,
  //         });
  //       },
  //     });
  // }

  // private getUsername(): string {
  //   // Implement logic to get the username
  //   return this.fileUploadData.username;
  // }

  // private getAdvertiseCode(): string {
  //   // Implement logic to get the advertise code
  //   return this.fileUploadData.advertiseCode;
  // }

  ngOnInit(): void {
    this.icon = faTrash;
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
