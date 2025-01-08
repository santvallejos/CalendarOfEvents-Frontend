import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubConnection: signalR.HubConnection;
  private hubUrl = `${environment.baseUrl}/Notifications`;

  constructor() {
    //Establecer la conexion con el hub
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

      //Iniciar Conexion
      this.hubConnection.start()
        .then(() => console.log('Connection started'))
        .catch(err => console.error('Error starting connection: ', err));
  }

  //Recibir notificaciones
  onReceiveNotification(callback: (message: string) => void): void{
    this.hubConnection.on('ReceiveNotification', callback);
  }
}
