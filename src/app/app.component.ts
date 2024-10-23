import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public ngOnInit(): void {
    this.setTheme();
    this.subscribeToThemeChange();
  }

  private setTheme(): void {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';

    document.querySelector('body')!.className = colorScheme;
  }

  private subscribeToThemeChange(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.setTheme();
    });
  }
}
