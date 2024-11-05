import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogScreenController, ToggleComponent } from 'percy';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToggleComponent],
  providers: [ DialogScreenController ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  constructor(
    public readonly _dialogScreenController: DialogScreenController
  ) {
  }

  public ngOnInit(): void {
    this._dialogScreenController.create({
      title: 'Test',
      component: ToggleComponent,
      componentProps: {
        label: signal('Test'),
        id: signal('test'),
        name: signal('test'),
        showLabel: signal(true),
        readonly: signal(false),
        disabled: signal(false),
        required: signal(false),
        invalid: signal(false),
        checked: signal(false),
      },
      closeFromBackground: true,
      hideCloseButton: false,
      hideTitle: false,
    });
  }
}
