import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../service/game/game.service';
import { Sequence } from '../../types/sequence';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {
  time = 15;
  playerSequence: String[] = [];
  sequence: Sequence[] = [];

  @ViewChild(CardComponent) cardComponent: CardComponent | undefined;

  constructor(@Inject(GameService) private gameService: GameService) { }
  ngOnInit(): void {
    this.gameService.startNewGame();
    this.gameService.nextLevel(); 
    this.gameService.generateNewSequence();
    this.sequence = this.gameService.getSequence();
    setTimeout(() => this.playSequence(), 1000);
  }

  playSequence(){
    this.cardComponent?.playSequence();
  }
  
  
}