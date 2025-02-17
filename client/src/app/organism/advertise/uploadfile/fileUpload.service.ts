import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageDto } from './uploadfile.component';
export interface fileUploadData {
  imageData: {
    highQualityFiles: ImageDto[];
    lowQualityFiles: ImageDto[];
  };
  username: string;
  advertiseCode: string;
}
@Injectable({
  providedIn: 'root',
})
export class FileUploadservice {
  uploadedImageData = new Subject<fileUploadData>();
  advertiseCode = new Subject<string>();
}
