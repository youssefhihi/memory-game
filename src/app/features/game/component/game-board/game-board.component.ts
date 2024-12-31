import { Result } from './../../types/result';
import { Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { GameService } from '../../service/game/game.service';
import { Sequence } from '../../types/sequence';
import { CardComponent } from '../card/card.component';
import { Answer } from '../../types/answer';
import { ScoreComponent } from '../score/score/score.component';
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
  disabled: boolean = false;
  playerName: string = '';
  msg: string = "game on!";
  gameOverMessage: string | null = null;
  @ViewChild(CardComponent) cardComponent: CardComponent | undefined;
  @ViewChild(ScoreComponent) scoreComponent: ScoreComponent | undefined;

  constructor(
    private gameService: GameService,
    private resultService: ResultService
  ) { }
  ngOnInit(): void {
    this.playerName = localStorage.getItem('playerName') || 'unknown player';
    this.msg = "Alright, "+ this.playerName +" let's light it up! 🎮✨";
    this.startNewLevel();
  }
  
  startNewLevel(): void {
    this.gameService.generateNewSequence();
    this.sequence = this.gameService.getSequence();
    setTimeout(() => {
      this.cardComponent?.playSequence();
      this.cardComponent?.startCountdown();
    }, 500);
  }

  validateSequence(): void {
    if (this.isPlaying()) return; 
    let answer: Answer = this.cardComponent?.validateSequence()||{ playerSequence: [], timeRemaining: 0 };
    if(answer.playerSequence.length === 0){
      this.gameOverMessage = "No answer provided. You lost!";
      this.gameOver({id: 0 , score: this.scoreComponent?.getScore()||0, level: this.level, sequenceChosen: answer.playerSequence, sequenceCorrect: this.sequence});
      this.disabled = true;
      return; 
    }
    console.log("answer",answer);
   let isCorrect:Boolean = this.gameService.checkAnswer(answer);
    if (isCorrect){ 
      this.level++;
      this.scoreComponent?.calculateScore(answer.timeRemaining);
      this.startNewLevel();
      if (this.level > 10 && this.level < 20) {
        this.msg = "Level " + this.level + "? Impressive! You're basically a memory ninja now! 😎🥷";
      } else if (this.level <= 10 && this.level > 5) {
        this.msg = "Level " + this.level + "? You're a quick learner! Keep it up! 😊🚀";
      } else if (this.level <= 5) {
        this.msg = "It's just the beginning, champ! 😌🐣 Keep going!";
      } else if (this.level >= 18 && this.level < 25) {
        this.msg = "Whoa, {{ playerName }}! You're soaring! 🤩 Memory master in the making! 🎩✨";
      } else if (this.level >= 25) {
        this.msg = "Level " + this.level + "? Unstoppable! You're on a roll! 😲🔥";
      }
      
    }else{
      this.gameOverMessage = "Wrong answer. You lost!";
      this.gameOver({id: 0 , score: this.scoreComponent?.getScore()||0, level: this.level, sequenceChosen: answer.playerSequence, sequenceCorrect: this.sequence});
      this.disabled = true;
      this.msg = "Whoa there, " + this.playerName +"! Are you sure you're not colorblind? 🎨👀"
    }
  }

  resetSequence(): void {
    if (this.isPlaying()) return;
    this.cardComponent?.resetSequence();
    this.gameService.gameOver();
  }

  isPlaying(): boolean {
    if(this.disabled)  return true;
    return this.cardComponent?.sequencePlaying() || false;
  }
 
  gameOver(result:Result): void {
    this.resultService.setResult(result);
    this.resetSequence();
  }
}