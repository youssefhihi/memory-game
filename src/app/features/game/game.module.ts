import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameBoardComponent } from './component/game-board/game-board.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'game', component: GameBoardComponent }
];
@NgModule({
  declarations: [
    GameBoardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    GameRoutingModule,
    SharedModule,
    FormsModule
  ],
 
})
export class GameModule { }
