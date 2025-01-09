import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import { CommonModule, NgFor } from '@angular/common';
import { format } from "@formkit/tempo";
import { NewNotification } from '../../models/notification.model'

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, NgFor],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  eventsNotifications: NewNotification[] = [];
  private readonly expirationDuration = 90 * 60 * 1000; // Una hora y media en milisegundos

  constructor(private notificationsService: SignalrService) {}

  ngOnInit(): void {
    this.loadNotifications();

    this.notificationsService.onReceiveNotification(
      (title: string, eventDate: string, finishEventDate: string) => {
        const expirationTime = Date.now() + this.expirationDuration;
        const newNotification: NewNotification = {
          title,
          eventDate: format(eventDate, { date: 'medium', time: 'short' }),
          finishEventDate,
          expirationTime
        };

        this.eventsNotifications.push(newNotification);
        this.saveNotifications();
      }
    );
  }

  //Cargar notificaciones válidas desde localStorage
  private loadNotifications(): void {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      const parsedNotifications: NewNotification[] = JSON.parse(storedNotifications);

      // Filtrar notificaciones expiradas
      const validNotifications = parsedNotifications.filter(
        (notification) => notification.expirationTime > Date.now()
      );

      this.eventsNotifications = validNotifications;
    }
  }

 //Guardar las notificaciones actuales en localStorag//e//
  private saveNotifications(): void {
    localStorage.setItem('notifications', JSON.stringify(this.eventsNotifications));
  }
  
  deleteNotification(index: number): void {
    this.eventsNotifications.splice(index, 1);
    alert('Notificación eliminada');
    this.saveNotifications();
  }
}

