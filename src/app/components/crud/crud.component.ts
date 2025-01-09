import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { SharedEventsService } from '../../services/shared-events.service';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-crud',
  imports: [CommonModule ,ReactiveFormsModule, NgFor, FormatDatePipe],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit{
  //inicializar el formulario
  EventForm!: FormGroup;

  selectedEventId: string = '';
  events: Event[] = [];

  isLoading: boolean = true; // Indicador de carga

  //Realizar las validaciones desde el constructor
  constructor (private fb: FormBuilder, private eventsService: EventsService,private sharedEventsService: SharedEventsService) {
    this.EventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      finishEventDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    //Carga inical para los eventos
    this.sharedEventsService.loadEvents();
    this.sharedEventsService.event$.subscribe((data) => {
      this.events = data
    })
  }

  //Agregar un evento
  onSubmitAddEvent() {
    if(this.EventForm.valid) {
      const newEvent: Event = this.EventForm.value;
      this.eventsService.addEvent(newEvent).subscribe({
        next: (response) => {
          console.log('Evento creado con éxito:', response);
          this.EventForm.reset();
          this.sharedEventsService.loadEvents();
        },
        error: (err) => {
          console.log('Error al creal el evento: ', err)
        }
      });
    }
    else{
      console.log("Verifique los campos requeridos!");
    }
  }

  //Editar un evento
  onSubmitEditEvent(id: string) {
    if (this.EventForm.valid) {

      const editEvent: Event = {
        id: id,
        title: this.EventForm.value.title,
        eventDate: this.EventForm.value.eventDate,
        finishEventDate: this.EventForm.value.finishEventDate,
      };

      this.eventsService.updateEvent(id, editEvent).subscribe({
        next: (response) => {
          console.log('Evento editado con éxito:', response);
          this.EventForm.reset();
          this.sharedEventsService.loadEvents();
        },
        error: (err) => {
          console.log('Error al actualizar el evento:', err);
        },
      });

    } else {
      console.log('Formulario inválido');
    }
  }

  //Eliminar un evento
  onSubmitDeleteEvent(id: string){
    this.eventsService.deleteEvent(id).subscribe({
      next: (response) => {
        alert('Tarea Eliminada');
        this.sharedEventsService.loadEvents();
      },
      error: (err) => {
        console.log('Error eliminar el evento: ', err)
      }
    });
  }

  //Seleccionar el id de un evento
  selectedEvent(id: string): void {
    this.selectedEventId = id;
    const selectedEvent = this.events.find(event => event.id === id);
    if (selectedEvent) {
      this.EventForm.patchValue({
        title: selectedEvent.title,
        eventDate: selectedEvent.eventDate,
        finishEventDate: selectedEvent.finishEventDate
      });
    }
  }

  clearForm(): void{
    if(this.selectedEventId){
      //Limpiar los valores si se cargaron en el selectedEvent
      this.EventForm.reset();
    }
  }
}
