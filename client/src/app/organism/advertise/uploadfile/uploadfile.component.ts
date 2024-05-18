import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
})
export class UploadfileComponent {
  public message!: string;
  public progress!: number;
  public uploadedFiles: string[] = [];
  @Output() onUploadFinished = new EventEmitter<string[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public uploadFiles = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    this.http
      .post('https://localhost:5001/api/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = event.total
              ? Math.round((100 * event.loaded) / event.total)
              : 0;
          } else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.uploadedFiles = event.body as string[];

            // this.uploadedFiles = (event.body as any[]).map(
            //   (file) => `https://localhost:5001/${file.dbPath}`
            // );
          }
        },
        complete: () => {
          this.onUploadFinished.emit(this.uploadedFiles);
        },
      });
  };

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadFiles(input.files);
    }
  }
}
