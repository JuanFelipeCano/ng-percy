import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePickerComponent } from './components';
import { DatePickerConfig } from './components/date-picker/models';
import { DialogScreenController } from './components/dialog-screen/dialog-screen.controller';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    // public modalService: ModalService
    public dialogScreenController: DialogScreenController
  ) {
    this.openModal()
  }

  openModal() {
    const ref =this.dialogScreenController.create({
      component: DatePickerComponent,
      componentProps: {
        config: signal<DatePickerConfig>({ format: 'DDD', date: new Date(2024, 0, 1) }),
      },
    }).subscribe((result) => {
      console.log('Resultado del modal:', result);
      // this.dialogScreenController.close();
    });
  }

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
