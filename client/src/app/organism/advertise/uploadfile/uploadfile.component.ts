import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileUploadservice } from './fileUpload.service';

export interface ImageDto {
  dbPath: string;
  fileName: string;
}

export interface UploadFinishedEvent {
  imageData: ImageDto[];
  username: string;
  advertiseCode: string;
}

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
})
export class UploadfileComponent {
  public message: string = '';
  public progress: number = 0;
  public uploadedFiles: ImageDto[] = [];
  @Input() username!: string;
  @Input() advertiseCode!: string;
  public alertType!: string;
  @Output() onUploadFinished = new EventEmitter<UploadFinishedEvent>();

  constructor(
    private http: HttpClient,
    private fileUploadServ: FileUploadservice
  ) {}

  ngOnInit(): void {
    // const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    // this.username = user.username;
    // this.advertiseCode = Math.floor(Math.random() * 1000000000); // Generate random advertise code
    console.log('advertise Code', this.advertiseCode);
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
      .post<ImageDto[]>('https://localhost:5001/api/upload', formData, {
        reportProgress: true,
        observe: 'events',
        headers: headers,
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = event.total
              ? Math.round((100 * event.loaded) / event.total)
              : 0;
          } else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';

            this.uploadedFiles = event.body ?? [];
            this.alertType = 'success';
            // Emit the event object with additional data
          }
        },
        error: (err) => {
          this.message = `Upload failed: ${err.message}`;
          this.alertType = 'error';
        },
        complete: () => {
          this.fileUploadServ.uploadedImageData.next({
            imageData: this.uploadedFiles,
            username: this.username,
            advertiseCode: this.advertiseCode.toString(),
          });
          this.onUploadFinished.emit({
            imageData: this.uploadedFiles,
            username: this.username,
            advertiseCode: this.advertiseCode.toString(),
          });
        },
      });
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.uploadFiles(input.files);
    }
  }
}
