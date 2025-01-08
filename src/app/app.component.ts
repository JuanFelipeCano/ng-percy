import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PercyDialogScreenController, PercyDropdownListOption, PercyButtonComponent, PercyCheckboxComponent, PercyDropdownComponent, PercyDropdownListComponent, PercyToastComponent, PercyToastController, PercyToggleComponent } from 'percy';
import { Observable } from 'rxjs';
import { ExamplesComponent } from './components/examples/examples.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PercyToggleComponent, PercyButtonComponent, PercyCheckboxComponent, PercyToastComponent, PercyDropdownComponent, PercyDropdownListComponent ],
  providers: [ PercyDialogScreenController, PercyToastController ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  public screen!: Observable<unknown>;
  public dropdownOpen = false;

  public readonly options: PercyDropdownListOption[] = [
    { value: '1', text: 'Option 1'},
    { value: '2', text: 'Option 2'},
    { value: '3', text: 'Option 3' },
    { value: '4', text: 'Option 4' },
    { value: '5', text: 'Option 5' },
    { value: '6', text: 'Option 6' },
    { value: '7', text: 'Option 7' },
    { value: '8', text: 'Option 8' },
    { value: '9', text: 'Option 9' },
    { value: '10', text: 'Option 10' },
  ];

  constructor(
    public readonly _dialogScreenController: PercyDialogScreenController,
    public readonly _percyToastController: PercyToastController,
  ) {
  }

  public ngOnInit(): void {
    this.screen = this._dialogScreenController.create({
      title: 'Test',
      component: ExamplesComponent,
      // componentProps: {
      //   label: signal('Test'),
      //   id: signal('test'),
      //   name: signal('test'),
      //   labelStyle: signal('floating'),
      //   type: signal('text'),
      //   showLabel: signal(true),
      //   readonly: signal(false),
      //   disabled: signal(false),
      //   required: signal(false),
      //   invalid: signal(false),
      //   checked: signal(false),
      // },
      closeFromBackground: true,
      hideCloseButton: false,
      hideTitle: false,
    });
  }

  public showDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public openModal(): void {
    this.screen.subscribe();
  }

  public showToast(): void {
    // this._percyToastController.show({
    //   message: 'Test',
    //   type: 'success',
    //   description: 'This is a toast',
    //   icon: 'calendar-outline',
    //   shape: 'square',
    //   position: 'top-right',
    // });

    this._percyToastController.show({
      message: 'Test',
      description: 'This is a toast',
      type: 'warning',
    });
  }
}
