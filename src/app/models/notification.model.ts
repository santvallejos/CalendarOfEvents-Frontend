export interface NewNotification {
    title: string;
    eventDate: string;
    finishEventDate: string;
    expirationTime: number; // Se usará para controlar la caducidad
  }