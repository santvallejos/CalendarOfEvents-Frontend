import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CrudComponent } from './components/crud/crud.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalendarComponent, CrudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calendar Of Events';
}
