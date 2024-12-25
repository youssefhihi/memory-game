import { Result } from './../../types/result';
import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { GameService } from '../../service/game/game.service';
import { Sequence } from '../../types/sequence';
import { CardComponent } from '../card/card.component';
import { Answer } from '../../types/answer';
import { ScoreComponent } from '../score/score/score.component';
import { Router } from '@angular/router';
import { ResultService } from '../../service/result/result.service';

@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit {
  playerSequence: String[] = [];
  sequence: Sequence[] = [];
  level : number = 1;
  msg: string = '';
  disalbed: boolean = false;
  @ViewChild(CardComponent) cardComponent: CardComponent | undefined;
  @ViewChild(ScoreComponent) scoreComponent: ScoreComponent | undefined;

  constructor(
    private gameService: GameService,
    private resultService: ResultService
  ) { }
  ngOnInit(): void {
    this.startNewLevel();
  }
  
  startNewLevel(): void {
    this.gameService.generateNewSequence();
    this.sequence = this.gameService.getSequence();
    setTimeout(() => {
      this.cardComponent?.playSequence();
      this.cardComponent?.startCountdown();
    }, 2000);
  }

  validateSequence(): void {
    if (this.isPlaying()) return; 
    let answer: Answer = this.cardComponent?.validateSequence()||{ playerSequence: [], timeRemaining: 0 };
    if(answer.playerSequence.length === 0){
      console.log("nooo answer",answer);
      this.gameOver({id: 0 , score: this.scoreComponent?.getScore()||0, level: this.level, sequenceChosen: answer.playerSequence, sequenceCorrect: this.sequence});
      return; 
    }
    console.log("answer",answer);
   let isCorrect:Boolean = this.gameService.checkAnswer(answer);
    if (isCorrect){ 
      this.level++;
      this.scoreComponent?.calculateScore(answer.timeRemaining);
      this.sequence = this.gameService.getSequence();
      setTimeout(() => {this.cardComponent?.playSequence(), this.cardComponent?.startCountdown()}, 2000);
    }else{
      this.gameOver({id: 0 , score: this.scoreComponent?.getScore()||0, level: this.level, sequenceChosen: answer.playerSequence, sequenceCorrect: this.sequence});
    }
  }

  resetSequence(): void {
    if (this.isPlaying()) return;
    this.cardComponent?.resetSequence();
    this.gameService.gameOver();
  }

  isPlaying(): boolean {
    return this.cardComponent?.sequencePlaying() || false;
  }
 
  gameOver(result:Result): void {
    this.resultService.setResult(result);
    this.resetSequence();
  }
}