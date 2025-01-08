import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedEventsService } from '../../services/shared-events.service';
import { Event } from '../../models/event.model';

//Imports del Full calendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  events: Event[] = [];
  isLoading: boolean = true; // Indicador de carga

  constructor(private sharedEventsServices: SharedEventsService) { }

  ngOnInit(): void {
    this.sharedEventsServices.loadEvents();
    this.sharedEventsServices.event$.subscribe((data) => {
      this.events = data

      // Configura las opciones del calendario con los eventos cargados
      this.calendarOptions = {
        locale: esLocale,
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        height: 800,
        contentHeight: 600,
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
          timeGridPlugin,
          listPlugin
        ],
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,list'
        },
        titleFormat: {
          year: 'numeric',
          month: 'long'
        },
        events: this.events.map((e) => ({
          title: e.title,
          start: e.eventDate,
          end: e.finishEventDate
        })),
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        dateClick: this.onDateClick.bind(this),
        eventClick: this.onEventClick.bind(this),
      };

      // Desactiva el indicador de carga
      this.isLoading = false;
    },
      (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false; // Incluso en caso de error, desactiva el indicador
      }
    );
  }

  onDateClick(info: any): void {
    alert('Fecha: ' + info.dateStr);
  }

  onEventClick(info: any): void {
    alert(info.event.title);
  }
}