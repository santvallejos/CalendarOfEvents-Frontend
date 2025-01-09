import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  hubConnection: signalR.HubConnection;
  private hubUrl = `${environment.baseUrl}/Notifications`;

  constructor() {
    //Establecer la conexion con el hub
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    //Iniciar Conexion
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.error('Error starting connection: ', err));
  }

  //Si el backend me manda mas de un variable, hay que asignarle a cada una de ellas una en el front
  onReceiveNotification(
    callback: (
      title: string,
      eventDate: string,
      finishEventDate: string
    ) => void
  ): void {
    this.hubConnection.on(
      'ReceiveNotification',
      (title: string, eventDate: string, finishEventDate: string) => {
        callback(title, eventDate, finishEventDate);
      }
    );
  }
}
