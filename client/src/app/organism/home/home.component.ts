import { Component, OnInit } from '@angular/core';
import { flipInOut } from 'src/app/services/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [flipInOut],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    // localStorage.clear();
  }
}
