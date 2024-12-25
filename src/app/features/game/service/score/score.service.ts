import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
 private score: number = 0
  constructor() { }


  calculateScore(timeTaken: number): void {
    console.log("hi", timeTaken);
    const baseScore = 10;
    const bonusPoints = 50;
    const timeBonus = bonusPoints / (timeTaken + 1);
    const totalScore = baseScore + Math.round(timeBonus);
    console.log('Total Score:', totalScore);
    this.score += totalScore;
  }

  getScore(): number {    
    return this.score;
  }

  resetScore(): void {
    this.score = 0;
  }
}
