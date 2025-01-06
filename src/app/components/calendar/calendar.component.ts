import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  calendarOptions!: CalendarOptions;

  events: any[] = []

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      weekends: false, // initial value
      events: this.events.map((e) => ({
        id: e.id,
        title: e.title,
        start: e.eventDate,
        end: e.finishEventDate,
      })),
      editable: true,
      selectable: true,
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
    };
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        weekends: false, // initial value
        events: data.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.eventDate,
          end: e.finishEventDate,
        })),
        editable: true,
        selectable: true,
        dateClick: this.onDateClick.bind(this),
        eventClick: this.onEventClick.bind(this),
      };
    });
  }

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr)
  }

  onDateClick(info: any): void {
    alert('Clicked on date: ' + info.dateStr);
  }

  onEventClick(info: any): void {
    alert('Event: ' + info.event.title);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends
  }
}
