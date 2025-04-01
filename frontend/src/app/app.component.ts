import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CallHubService } from './services/call-hub.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'frontend';
  constructor(private callHubService: CallHubService) {}
}
