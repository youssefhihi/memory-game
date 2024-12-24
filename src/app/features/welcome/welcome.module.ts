import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', component: WelcomeComponent },
];
@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule
  ],

})
export class WelcomeModule { }
