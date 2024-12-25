import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameBoardComponent } from './component/game-board/game-board.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './component/card/card.component';
import { ScoreComponent } from './component/score/score/score.component';
import { ResultComponent } from './component/result/result/result.component';

const routes: Routes = [
  { path: 'game', component: GameBoardComponent },
  {path:'result',component:ResultComponent}
];
@NgModule({
  declarations: [
    GameBoardComponent,
    CardComponent,
    ScoreComponent,
    ResultComponent
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
