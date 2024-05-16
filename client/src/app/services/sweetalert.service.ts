import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  floatAlert(
    title: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'
  ) {
    return Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  alert(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'
  ) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'متوجه شدم',
    });
  }

  confirm(title: string, text: string) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله، خروج',
      cancelButtonText: 'خیر',
      customClass: {
        confirmButton: 'my-button-class',
        cancelButton: 'my-button-class',
        container: 'my-button-class ',
      },
    });
  }
}
