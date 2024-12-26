import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoardComponent } from './component/game-board/game-board.component';
import { ResultComponent } from './component/result/result/result.component';
import { resultGuard } from '../../core/guards/resultPage/result.guard';

const routes: Routes = [
   { path: 'game', component: GameBoardComponent },
    {path:'result',component:ResultComponent, canActivate: [resultGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
