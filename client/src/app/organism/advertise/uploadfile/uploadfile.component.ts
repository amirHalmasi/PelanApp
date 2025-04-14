import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileUploadservice } from './fileUpload.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetiseProfileService } from '../../my-advertises/house-advertise-profile.service';
import { AlertComponent } from './alert/alert.component';
import { NgIf } from '@angular/common';

export interface ImageDto {
  path?: string;
  fileName?: string;
}

export interface UploadFinishedEvent {
  imageData: {
    highQualityFiles: ImageDto[];
    lowQualityFiles: ImageDto[];
  };
  username: string;
  advertiseCode: string;
}

@Component({
    selector: 'app-uploadfile',
    templateUrl: './uploadfile.component.html',
    styleUrls: ['./uploadfile.component.css'],
    standalone: true,
    imports: [NgIf, AlertComponent],
})
export class UploadfileComponent {
  public message: string = '';
  public progress: number = 0;
  public uploadedFiles!: {
    highQualityFiles: ImageDto[];
    lowQualityFiles: ImageDto[];
  };
  @Input() username!: string;
  @Input() advertiseCode!: string;
  public alertType!: string;
  @Output() onUploadFinished = new EventEmitter<UploadFinishedEvent>();

  constructor(
    private http: HttpClient,
    private fileUploadServ: FileUploadservice,
    private advertiseData: AdvetiseDataService,
    private houseAdvertiseServ: HouseAdvetiseProfileService
  ) {}

  ngOnInit(): void {
    // this.advertiseData.previousRouteURL.subscribe((preRoute) => {
    //   console.log('preRoute', preRoute);
    //   if (preRoute === 'edit/house') {
    //     this.advertiseCode =
    //       this.houseAdvertiseServ.advertiseItem.advertise.advertiseCode;
    //   }
    // });
    // const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    // this.username = user.username;
    // this.advertiseCode = Math.floor(Math.random() * 1000000000); // Generate random advertise code
    console.log('advertise Code', this.advertiseCode);

    // this.fileUploadServ.advertiseCode.subscribe({
    //   next: (data) => {
    //     console.log('advertise Code async', data);
    //   },
    // });
  }

  public uploadFiles(files: FileList): void {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    formData.append('username', this.username);
    formData.append('advertiseCode', this.advertiseCode.toString());

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );
    // console.log(authUser.token);
    const headers = {
      Authorization: `Bearer ${authUser.token}`,
    };
    this.http
      .post<{
        highQualityFiles: ImageDto[];
        lowQualityFiles: ImageDto[];
      }>('https://localhost:5001/api/upload', formData, {
        reportProgress: true,
        observe: 'events',
        headers: headers,
      })
      .subscribe({
        next: (event) => {
          console.log('add image advertise code', this.advertiseCode);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = event.total
              ? Math.round((100 * event.loaded) / event.total)
              : 0;
          } else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            console.log(' event.body', event.body);

            this.uploadedFiles = event.body ?? {
              // highQualityFiles: [{ path: '', fileName: '' }],
              // lowQualityFiles: [{ path: '', fileName: '' }],
              highQualityFiles: [],
              lowQualityFiles: [],
            };
            this.alertType = 'success';
            // Emit the event object with additional data
          }
        },
        error: (err) => {
          this.message = `Upload failed: ${err.message}`;
          this.alertType = 'error';
          console.log('add image advertise code', this.advertiseCode);
        },
        complete: () => {
          this.fileUploadServ.uploadedImageData.next({
            imageData: {
              highQualityFiles: this.uploadedFiles.highQualityFiles,
              lowQualityFiles: this.uploadedFiles.lowQualityFiles,
            },
            username: this.username,
            advertiseCode: this.advertiseCode?.toString(),
          });
          this.onUploadFinished.emit({
            imageData: {
              highQualityFiles: this.uploadedFiles.highQualityFiles,
              lowQualityFiles: this.uploadedFiles.lowQualityFiles,
            },
            username: this.username,
            advertiseCode: this.advertiseCode?.toString(),
          });
        },
      });
  }

  public onFileChange(event: Event): void {
    console.log('add image advertise code file changes', this.advertiseCode);
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.uploadFiles(input.files);
    }
  }
}
