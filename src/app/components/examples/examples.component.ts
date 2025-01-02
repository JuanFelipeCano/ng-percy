import { Component } from '@angular/core';
import { PercyDatePickerComponent, PercyInputComponent, PercyButtonComponent, PercyToggleComponent } from 'percy';

@Component({
  selector: 'percy-examples',
  standalone: true,
  imports: [ PercyInputComponent, PercyToggleComponent, PercyDatePickerComponent, PercyButtonComponent ],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent {

  public showFields = true;

  public toggleChange(): void {
    this.showFields = !this.showFields;
  }

}
