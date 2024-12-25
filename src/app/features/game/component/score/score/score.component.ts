import { Component } from '@angular/core';
import { ScoreService } from '../../../service/score/score.service';

@Component({
  selector: 'app-score',
  standalone: false,
  
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  score : number = 0;

  constructor(private scoreService: ScoreService) { }
  
  updateScore(): void {
    this.score = this.scoreService.getScore();
  }

  getScore(): number {
    return this.score;
  }
  calculateScore(timeTaken: number): void {
    this.scoreService.calculateScore(timeTaken);
    this.updateScore();
  }

  gameOver(): void {
    this.scoreService.resetScore();
    this.updateScore();
  }
}
