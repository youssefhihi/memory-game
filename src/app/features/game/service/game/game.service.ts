import { Injectable } from '@angular/core';
import { log } from 'console';
import { Sequence } from '../../types/sequence';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private playerSequence: string[] = [];
  private sequence: Sequence[] = [];
  private score: number = 0;
  private level: number = 1;

  constructor() { 
  }

   generateNewSequence() : Sequence[] {
    let color: string;
    let newOrder: number;

    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (this.sequence.some(seq => seq.colorHex === color));

    do{
      newOrder =Math.floor(Math.random() * this.sequence.length + 1);
    }while(this.sequence.find(sequence => sequence.order === newOrder));

    this.sequence.push({ id: this.sequence.length + 1, colorHex: color, order: newOrder});
    return this.sequence;
  }

  
  getSequence(): Sequence[] {
    return [...this.sequence];
  }

  checkAnswer(playerSequence: string[]): boolean {
      if(JSON.stringify(playerSequence) !== JSON.stringify(this.sequence)){
        return false;
      }else{
        return true;
    }
  }

  
 
  
  resetSequence(): void {
    this.sequence = [];
  }

  startNewGame(): void {
    this.playerSequence = [];
    this.score = 0;
    this.level = 1;
  
  }

  nextLevel(): void {
    this.level++;

  }

}
