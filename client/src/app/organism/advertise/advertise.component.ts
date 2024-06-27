import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  ImageDto,
  UploadFinishedEvent,
} from './uploadfile/uploadfile.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { persianLetterValidator } from 'src/assets/validation/persian-letters.validator';
import { numberValidator } from 'src/assets/validation/password.validator';
import { slideRightInOut } from 'src/app/services/animation';
interface deleteResponse {
  folderName: string;
  deletedFile: string;
  message: string;
}
@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css'],
  animations: [slideRightInOut],
})
export class AdvertiseComponent implements OnInit {
  isApartment: boolean = false;
  locations: any = [
    { value: 'Tejari_Maskuni', desc: 'تجاری مسکونی ' },
    { value: 'Maskuni', desc: 'مسکونی' },
  ];
  situations: any = [
    { value: 'shomali', desc: 'شمالی' },
    { value: 'Jonobi', desc: 'جنوبی' },
    { value: 'Nabsh_Shomali', desc: 'نبش شمالی' },
    { value: 'Nabsh_Junobi', desc: 'نبش جنوبی' },
    { value: 'Do_Bahr', desc: 'دوکله' },
    { value: 'Do_Bahr_Do_Nabsh', desc: 'دوکله دونبش' },
  ];

  houseTypes: any = [
    // { value: 'zamin', desc: 'زمین' },
    { value: 'Villaie', desc: 'ویلایی' },
    { value: 'Mojtama', desc: 'مجتمع آپارتمانی' },
    { value: 'ShakhsiSaz', desc: 'واحد شخصی ساز' },
  ];

  imageData: ImageDto[] = [];
  hasHouseWare: boolean = false;
  username!: string;
  advertiseCode!: string;
  icon!: any;
  advertiseForm!: FormGroup;
  hintDescription!: string;
  constructor(private http: HttpClient, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.icon = faTrash;
    this.advertiseForm = this.fb.group({
      groundMeter: [null, [Validators.required, numberValidator()]],
      houseMeter: [null, [Validators.required, numberValidator()]],
      rooms: [null, [Validators.required, numberValidator()]],
      wareHouse: [null, [Validators.email]],
      price: [null, [Validators.required, numberValidator()]],
      floors: [null, [Validators.required, numberValidator()]],
      floor: [null, [Validators.required, numberValidator()]],
      hasElevator: [null, [Validators.required]],
      neighbourhood: [null, persianLetterValidator()],
      desc: [null, persianLetterValidator()],
      location: [null, Validators.required],
      situation: [null, Validators.required],
      houseType: [null, Validators.required],
      hasHouseWare: [this.hasHouseWare],
    });
  }
  public uploadFinish = (event: UploadFinishedEvent) => {
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
  hint(event: any, inputField: string) {
    const value = this.advertiseForm.get(inputField)?.value;
    console.log('hint', value);
    this.hintDescription = value + 'متر مربع';
  }
  determineHouseType(houseTypeSelect: any) {
    console.log(houseTypeSelect);
    if (houseTypeSelect.value === 'Villaie') {
      this.isApartment = false;
    } else {
      this.isApartment = true;
    }
  }
}
