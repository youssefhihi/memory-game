import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';



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
    FormsModule,
    SharedModule
  ],

})
export class WelcomeModule { }
