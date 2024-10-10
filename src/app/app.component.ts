import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePickerComponent, DialogScreenComponent } from './components';
import { DialogScreenController } from './components/dialog-screen/dialog-screen.controller';
import { DatePickerConfig } from './components/date-picker/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePickerComponent, DialogScreenComponent],
  providers: [DialogScreenController],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-components';

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
    });
  }
}
