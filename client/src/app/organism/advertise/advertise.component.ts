import { Component } from '@angular/core';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css'],
})
export class AdvertiseComponent {
  imagePaths: string[] = [];

  public uploadFinish = (event: string[]) => {
    this.imagePaths = event;
    console.log(event);
  };

  createImagePath(serverPath: string) {
    serverPath = serverPath.replace(/\\/g, '/');
    return `https://localhost:5001/${serverPath}`;
  }
}
