import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'ambulance-menu';
}
