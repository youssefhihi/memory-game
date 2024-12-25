import { Injectable } from '@angular/core';
import { log } from 'console';
import { Sequence } from '../../types/sequence';
import { Answer } from '../../types/answer';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private sequence: Sequence[] = [];

  constructor() { }

   generateNewSequence() : Sequence[] {
    let color: string;
    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      console.log("from loop color", color);
    } while (this.sequence.some(sequence => sequence.colorHex === color));

    this.sequence.push({ colorHex: color, order: this.sequence.length + 1 });
    return this.sequence;
  }

  
  getSequence(): Sequence[] {
    return [...this.sequence];
  }

  checkAnswer(playerSequence: Answer): boolean {
    if(playerSequence.playerSequence.every((card, index) => card.order === this.sequence[index].order)){
        console.log('Correct! Generating new sequence... check');
        this.generateNewSequence();
        return true;
      }else{
        console.log('Incorrect! Generating new sequence...');
        this.gameOver();
        return false;
    }
  }

  
  gameOver(): Sequence[] {
    return this.sequence = [];

  }



}
