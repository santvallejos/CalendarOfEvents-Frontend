import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../models/event.model';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class SharedEventsService {
  private eventSubject = new BehaviorSubject<Event[]>([]);
  public event$ = this.eventSubject.asObservable();

  constructor(private eventsService: EventsService) { }

  //Cargar los eventos
  loadEvents(): void {
    this.eventsService.getEvents().subscribe(
      (events) => this.eventSubject.next(events),
      (error) => console.error('Eror al cargar los events: ', error)
    );
  }

  //Obetner eventos en tiempo real
  getEvents(): Event[]{
    return this.eventSubject.getValue();
  }

  //Actualizar la lista local
  updateEvents(events: Event[]): void{
    this.eventSubject.next(events)
  }
}
