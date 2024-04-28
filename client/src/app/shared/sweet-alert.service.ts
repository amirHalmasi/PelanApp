import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  alert(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'
  ) {
    return Swal.fire({
      title,
      text,
      icon,
    });
  }

  confirm(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question',
    // customClass: { [key: string]: string } = {}
    customClass: string
  ) {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'آره، میرم',
      cancelButtonText: 'نه، به خاطر تو میمونم',
      customClass: {
        confirmButton: customClass || 'custom-confirm-class',
        cancelButton: customClass || 'custom-cancel-class',
        container: customClass || 'custom-container-class',
      },
    });
  }
}
