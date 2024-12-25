import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from '../features/game/component/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
  ]
})
export class SharedModule { }
