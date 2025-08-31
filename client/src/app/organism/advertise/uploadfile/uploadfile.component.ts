import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileUploadservice } from './fileUpload.service';
import { AdvetiseDataService } from 'src/app/services/advertiseData.service';
import { HouseAdvetiseProfileService } from '../../my-advertises/my-advertises-profile.service';
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
    console.log('advertise Code', this.advertiseCode);
  }

  public uploadFiles(files: FileList): void {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    // formData.append('username', this.username);
    formData.append('advertiseCode', this.advertiseCode.toString());

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    this.http
      .post<{
        highQualityFiles: ImageDto[];
        lowQualityFiles: ImageDto[];
      }>('https://localhost:5001/api/upload', formData, {
        reportProgress: true,
        observe: 'events',
        withCredentials: true,
        // headers: headers,
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
              highQualityFiles: [],
              lowQualityFiles: [],
            };
            this.alertType = 'success';
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

  // public onFileChange(event: Event): void {
  //   console.log('add image advertise code file changes', this.advertiseCode);
  //   const input = event.target as HTMLInputElement;

  //   if (input.files) {
  //     this.uploadFiles(input.files);
  //   }
  // }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files: FileList = input.files;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB

    const invalidFiles = Array.from(files).filter(
      (f) => !allowedTypes.includes(f.type) || f.size > maxSizeInBytes
    );

    if (invalidFiles.length > 0) {
      this.message =
        'فقط تصاویر با فرمت JPG، PNG یا GIF و حداکثر حجم 1 مگابایت مجاز هستند.';
      this.alertType = 'error';
      return;
    }

    this.uploadFiles(files);
  }
}
