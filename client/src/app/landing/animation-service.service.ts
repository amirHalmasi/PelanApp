import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, isEmpty, throwError } from 'rxjs';
import { Province } from '../shared/province.model';
import { City } from '../shared/citiy.model';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  isAnimationCompleted = new EventEmitter<boolean>();
}
