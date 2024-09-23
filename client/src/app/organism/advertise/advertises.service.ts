import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
export interface advertiseSuccesDto {
  AdvertiseType: string;
  AdvertiseSubmitDate: string;
  Username: string;
  AdvertiseCode: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdvertisesService {
  isSubmitAdvertise = new Subject<boolean>();
  editUrl = new BehaviorSubject<string>('');
  // preUrl!: string;
  actionType = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient,
    private router: Router,
    private sweetAlertService: SweetAlertService
  ) {}
  private transformStoreFormValue(
    formValue: any,
    username: string,
    advertiseCode: string,
    // advertiseStructure means it is store house or ground
    advertiseStructure: string
  ): any {
    let transformedValue = {
      ...formValue.commonFields,
      ...formValue.rentFields,
      ...formValue.sellFields,
      ...formValue.type,
      ...formValue,
      city: formValue?.city?.city_id.toString(),
      province: formValue?.province?.province_id.toString(),
      username: username,
      advertiseCode: advertiseCode,
    };
    delete transformedValue.commonFields;
    delete transformedValue.sellFields;
    delete transformedValue.rentFields;
    delete transformedValue.type;

    if (advertiseStructure === 'store') {
      transformedValue = {
        ...transformedValue,
        hasElevator: formValue?.commonFields?.hasElevator.toString(),
        hasBalconey: formValue?.commonFields?.hasBalconey.toString(),
        hasCeramic: formValue?.commonFields?.hasCeramic.toString(),
        hasRestroom: formValue?.commonFields?.hasRestroom.toString(),
        hasParking: formValue?.commonFields?.hasParking.toString(),
      };
    }

    return transformedValue;
  }
  addAdvertise(
    requestUrl: string,
    value: string,
    username: string,
    advertiseCode: string,
    advertiseStructure: string
  ) {
    const authUser = JSON.parse(
      localStorage.getItem('authUser') || '{isJobOwner:"",token:"",username:""}'
    );
    const headers = {
      Authorization: `Bearer ${authUser.token}`,
    };

    const transformedValue = this.transformStoreFormValue(
      value,
      username,
      advertiseCode,
      advertiseStructure
    );
    requestUrl = requestUrl + transformedValue.advertiseType;
    this.http
      .post<advertiseSuccesDto>(requestUrl, transformedValue, {
        headers: headers,
      })
      .subscribe({
        next: (res: advertiseSuccesDto) => {
          console.log(res);
          if (res) {
            console.log(res);
          }
        },
        error: (err) => {
          console.error(err.error);
          // let errorMessage = '';

          // return new Promise<boolean>(() => {
          this.sweetAlertService.floatAlert('خطا در ثبت آگهی', 'error');
          // });
        },
        complete: () => {
          this.isSubmitAdvertise.next(true);
          this.router.navigate(['/home']);
          // this.navbarServ.isTokenExist.next(true);
        },
      });
  }
}
