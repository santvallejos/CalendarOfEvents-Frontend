import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CrudComponent } from './components/crud/crud.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SignalrService } from './services/signalr.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarComponent, CrudComponent, NotificationsComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calendar Of Events';

  notification: string | null = null;

  constructor(private signalrService: SignalrService) {}

  ngOnInit(): void {
    this.signalrService.onReceiveNotification((message: string) => {
      this.notification = message;

      // Ocultar la notificación después de 5 segundos
      setTimeout(() => {
        this.notification = null;
      }, 10000);
    });
  }
}
