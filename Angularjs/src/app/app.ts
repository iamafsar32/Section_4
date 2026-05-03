import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent }       from './shared/navbar/navbar';
import { NotificationComponent } from './shared/notification/notification';

@Component({
  selector:    'app-root',
  standalone:  true,
  imports:     [RouterOutlet, NavbarComponent, NotificationComponent],
  templateUrl: './app.html',
  styleUrls:   ['./app.css']
})
export class AppComponent {
  title = 'angular-finance-tracker';
}