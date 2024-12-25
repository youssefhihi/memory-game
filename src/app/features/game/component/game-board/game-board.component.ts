import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { GameService } from '../../service/game/game.service';
import { Sequence } from '../../types/sequence';
import { CardComponent } from '../card/card.component';
import { Answer } from '../../types/answer';

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

  constructor(@Inject(GameService) private gameService: GameService
) { }
  ngOnInit(): void {
    this.gameService.startNewGame();
    this.gameService.generateNewSequence();
    this.sequence = this.gameService.getSequence();
    setTimeout(() => {this.cardComponent?.playSequence(), this.cardComponent?.startCountdown()}, 2000);
  }


  validateSequence(): void {
    const answer = this.cardComponent?.validateSequence();
    if(!answer) return;
    console.log("answer",answer);
   let isCorrect:Boolean = this.gameService.checkAnswer(answer);
    if (isCorrect){ 
      console.log('Correct! Generating new sequence...');
      this.sequence = this.gameService.getSequence();
      setTimeout(() => {this.cardComponent?.playSequence(), this.cardComponent?.startCountdown()}, 1000);
    }else{
      console.log('Incorrect! Try again.');
    }
  }
}