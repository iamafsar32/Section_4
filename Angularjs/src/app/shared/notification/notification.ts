import { Component } from '@angular/core';
import { NgFor, NgClass, AsyncPipe } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector:    'app-notification',
  standalone:  true,
  imports:     [NgFor, NgClass, AsyncPipe],
  templateUrl: './notification.html',
  styleUrls:   ['./notification.css']
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}