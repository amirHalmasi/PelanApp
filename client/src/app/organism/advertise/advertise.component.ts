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
import { Router, RouterOutlet } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/services/child-route.animation';
import {
  ImageDto,
  UploadFinishedEvent,
} from './uploadfile/uploadfile.component';
import { HttpClient } from '@angular/common/http';
interface deleteResponse {
  folderName: string;
  deletedFile: string;
  message: string;
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
  imageData: ImageDto[] = [];

  username!: string;
  advertiseCode!: string;

  constructor(private router: Router, private http: HttpClient) {}
  public uploadFinish = (event: UploadFinishedEvent) => {
    console.log('uploadFinish', event);
    this.imageData = event.imageData;
    this.username = event.username;
    this.advertiseCode = event.advertiseCode;
    console.log('event uploaded finish', event);
  };

  createImagePath(serverPath: string) {
    serverPath = serverPath.replace(/\\/g, '/');
    return `https://localhost:5001/${serverPath}`;
  }

  deleteImage(image: ImageDto) {
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );
    // console.log(authUser.token);
    const headers = {
      Authorization: `Bearer ${authUser.token}`,
    };
    this.http
      .delete(
        `https://localhost:5001/api/upload/delete?username=${this.getUsername()}&advertiseCode=${this.getAdvertiseCode()}&fileName=${
          image.fileName
        }`,
        { headers: headers }
      )
      .subscribe({
        next: (res) => {
          console.log('deleteImage response', res);
          // Remove the deleted image from imageData array
          this.imageData = this.imageData.filter(
            (img) => img.dbPath !== image.dbPath
          );
          console.log('this.imageData next', this.imageData);
        },
        error: (error) => {
          console.error('Error deleting image:', error);
          // Handle error
        },
        complete: () => {
          console.log('this.imageData', this.imageData);
        },
      });
  }

  private getUsername(): string {
    // Implement logic to get the username
    return this.username;
  }

  private getAdvertiseCode(): string {
    // Implement logic to get the advertise code
    return this.advertiseCode;
  }

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
