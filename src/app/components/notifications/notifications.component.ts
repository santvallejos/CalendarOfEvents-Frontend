import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, NgFor],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  eventsNotifications: string[] = [];

  constructor(private notificationsService: SignalrService) { }

  ngOnInit(): void {
    this.notificationsService.onReceiveNotification((message) => {
      this.eventsNotifications.push(message);
    })
  }
}
