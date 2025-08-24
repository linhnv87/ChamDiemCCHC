import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-system-base-layout',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './system-base-layout.html',
  styleUrl: './system-base-layout.scss',
})
export class SystemBaseLayout {
  title = input<string>('');
  showSearch = input<boolean>(false);

  triggerSearch = output<void>();
  clearSearch = output<void>();
}
