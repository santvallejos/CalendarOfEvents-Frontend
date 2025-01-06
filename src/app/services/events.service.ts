import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl = `${environment.baseUrl}/api/Events`;

  constructor(private http: HttpClient) { }

  //Traer todos los eventos 
  getEvents(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
