import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule.forRoot(routes)
  ]
})
export class ErrorsModule { }
