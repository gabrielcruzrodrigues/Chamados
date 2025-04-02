import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallHubService implements OnInit {
  private hubConnection: signalR.HubConnection | undefined;
  sinalRBackendUrl: string = environment.sinalRBackendUrl ?? 'http://192.168.1.65:5171/callHub';

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Cria a conexão com o servidor SignalR
    console.log(this.sinalRBackendUrl);
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.sinalRBackendUrl, {
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true
      })
      .build();


    console.log('Tentando conectar ao SignalR...');

    // Recebe as mensagens enviadas pelo servidor
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(`Mensagem recebida: ${message}`);
      const userRole = this.authService.getRole();

      if (userRole === 0 || userRole === 2) { //admin | moderador
        this.toastr.info("Um novo chamado foi aberto!")
        const audio = new Audio('/notification.mp3');

        audio.play().catch((error) => {
          console.error('Erro ao tentar reproduzir o áudio:', error);
        });

        audio.onended = () => {
          if (this.router.url === '/call/my' || this.router.url === '/admin/call') {
            // recarrega a página após o áudio ser reproduzido
            window.location.reload();
          }
        };
      }
    });

    // Inicia a conexão
    this.hubConnection
      .start()
      .then(() => console.log('Conectado ao SignalR'))
      .catch((err) => console.error('Erro ao conectar ao SignalR: ', err));
  }

  sendMessage(): void {
    const user = 'Usuario';
    const message = 'Olá, SignalR!';

    // Chama o método no servidor
    this.hubConnection?.invoke('SendMessage', user, message)
      .catch((err) => console.error('Erro ao enviar mensagem: ', err));
  }
}
