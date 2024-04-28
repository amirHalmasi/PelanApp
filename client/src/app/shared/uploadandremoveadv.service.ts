import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadandremoveadvService {
  constructor(private http: HttpClient) {}
  GetProduct() {
    return this.http.get(
      'https://localhost:44308/api/Product/GetProductwithimage'
    );
  }
  GetProductbycode(code: any) {
    return this.http.get(
      'https://localhost:44308/api/Product/GetProductwithimagebycode/' + code
    );
  }
  UploadImages(inputdata: any) {
    return this.http.post(
      'https://localhost:5001/api/Advertise/uploadimages',
      inputdata,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
  RemoveImage(imageIndex: string, username: string, advertiseCode: string) {
    return this.http.get(
      'https://localhost:5001/api/Advertise/removeimage/' +
        imageIndex +
        '/' +
        username +
        '/' +
        advertiseCode +
        '/'
      // '0/' +
      // '4280483851/' +
      // '373021/'
    );
  }
  GetImages(username: string, advertiseCode: string) {
    return this.http.get<string[]>(
      `https://localhost:5001/api/Advertise/getimages/${username}/${advertiseCode}`
    );
  }
  // getAllImages(username: string, advertiseCode: string) {
  //   return this.http.get<{
  //     remainImagePath: string[];
  //   }>(
  //     // `https://localhost:5001/api/Advertise/getimages/4280483851/${advertiseCode}`
  //     'https://localhost:5001/api/Advertise/getimages/' +
  //       '4280483851/' +
  //       '373021/'
  //   );
  // }
}
