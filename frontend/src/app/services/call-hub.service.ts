import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class CallHubService {
  private hubConnection!: signalR.HubConnection;

  constructor() {
    this.startConnection();
  }

  private startConnection() {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    // .withUrl('https://localhost:7125/callHub', {
    //   withCredentials: false,  // Mantenha ou remova se necessário
    // })
    // .build();

    // this.hubConnection.start().catch(err => console.error(err));

    // this.hubConnection.on('ReceberChamado', (mensagem) => {
    //   console.log(`Novo chamado: ${mensagem}`);
    //   alert(`Novo chamado: ${mensagem}`);
    // });

    const connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:7125/callHub')
  .build();

  connection.start()
    .then(() => console.log("Conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar:", err));

    }
}
