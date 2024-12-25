import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() value: string = '';
  @Input() disabled: boolean = false;

}
