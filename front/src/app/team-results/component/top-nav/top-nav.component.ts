import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-top-nav',
  styleUrl: './top-nav.component.scss',
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
  readonly linkLabel = input.required<string>();
  readonly link = input.required<string>();
}
