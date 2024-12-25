import { Injectable } from '@angular/core';
import { log } from 'console';
import { Sequence } from '../../types/sequence';
import { Answer } from '../../types/answer';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private sequence: Sequence[] = [];
  private score: number = 0;
  private level: number = 1;

  constructor() { 
  }

   generateNewSequence() : Sequence[] {
    let color: string;
    let newOrder: number = 0;
    let attempts = 0;
    const maxAttempts = 1000; // Arbitrary limit to prevent infinite loops

    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      console.log("from loop color", color);
    } while (this.sequence.some(sequence => sequence.colorHex === color));

    
    while (attempts < maxAttempts) {
      newOrder = Math.floor(Math.random() * (this.sequence.length + 1)) + 1;
      console.log("from loop newOrder", newOrder);
      const foundSequence = this.sequence.find(sequence => sequence.order === newOrder);
      if (!foundSequence) {
        break; 
      }
      attempts++;
    }
    
    if (attempts === maxAttempts) {
      throw new Error("Could not generate a unique order after 1000 attempts.");
    }

    this.sequence.push({ id: this.sequence.length + 1, colorHex: color, order: newOrder});
    return this.sequence;
  }

  
  getSequence(): Sequence[] {
    return [...this.sequence];
  }

  checkAnswer(playerSequence: Answer): boolean {
      if(JSON.stringify(playerSequence.playerSequence) === JSON.stringify(this.sequence)){
        console.log('Correct! Generating new sequence... check');
        this.level++;
        this.calculateScore(playerSequence.timeRemaining);
        this.generateNewSequence();
        return true;
      }else{
        this.resetSequence();
        return false;
    }
  }

  private calculateScore(timeTaken: number): void {
    console.log("hi", timeTaken);
    const baseScore = 10;
    const bonusPoints = 50;
    const timeBonus = bonusPoints / (timeTaken + 1);
    const totalScore = baseScore + Math.round(timeBonus);
    console.log('Total Score:', totalScore);
    this.score += totalScore;
  }
  
 
  
  resetSequence(): void {
    this.sequence = [];
  }

  startNewGame(): void {
    this.score = 0;
    this.level = 1;
  
  }



}
