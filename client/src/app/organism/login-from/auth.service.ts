import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { UserInfoDto } from './user-info-dto.model';
export interface UserInfoDto {
  userId: number;
  username: string;
  isJobOwner: string;
  agentLinkId?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:5001/api/account';

  constructor(private http: HttpClient) {}

  // گرفتن اطلاعات یوزر لاگین‌شده
  getCurrentUser(): Observable<UserInfoDto> {
    return this.http.get<UserInfoDto>(`${this.baseUrl}/me`, {
      withCredentials: true, // 👈 برای ارسال کوکی
    });
  }
}
