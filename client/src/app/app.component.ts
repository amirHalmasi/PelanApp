import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface user {
  id: number;
  userName: string;
  userId: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'پلان';
  users: user[];
  isLoading: boolean = true;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    // this.getUsers();
  }
  getUsers() {
    this.http.get<user[]>('https://localhost:5001/api/users').subscribe({
      next: (response) => {
        console.log(response);
        this.users = response; // Assign the response to your users property to display it in your component.
        this.isLoading = false; // Set isLoading to false once the data is loaded.
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        this.isLoading = false; // Set isLoading to false in case of an error.
      },
    });
  }
}
