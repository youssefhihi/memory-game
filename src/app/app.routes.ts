import { Routes } from '@angular/router';
import { GameComponent } from './component/game/game.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'game', component: GameComponent },
    {path: '', component: WelcomeComponent},
    { path:"**", component: PageNotFoundComponent}
];
