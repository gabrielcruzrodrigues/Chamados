import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CallHubService } from './services/call-hub.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'SignalR Demo';

  constructor(private callHubService: CallHubService) {}  

  ngOnInit(): void {
    this.callHubService.ngOnInit(); 
  }
}
