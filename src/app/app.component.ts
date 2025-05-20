import { Component, HostBinding, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'amexan';

  constructor(private themeService: ThemeService) {}

  @HostBinding('class.dark') get darkMode() {
    return this.themeService.darkMode();
  }
}
