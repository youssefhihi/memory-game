import { Answer } from './../../types/answer';
import { Sequence } from '../../types/sequence';
import { Component, Input, SimpleChanges,NgZone ,OnChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('illuminate', [
      state('active', style({ transform: 'scale(1.3)' })),
      state('inactive', style({ transform: 'scale(1)' })),
      transition('active <=> inactive', animate('500ms ease-in-out')),
    ]),
  ],
})
export class CardComponent implements OnChanges {
  @Input() sequence: Sequence[] = [];
  shuffledSequence: Sequence[] = [];
  playerSequence: Answer = { playerSequence: [], timeRemaining: 0 };
  isPlaying: boolean = false;
  time: number = 5;
  dateStart: number = 0;
  cardStates: { [key: number]: string } = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sequence']) {
      this.playerSequence = { playerSequence: [], timeRemaining: 0 };
      this.shuffleSequence();
      console.log('ngOnChanges: sequence updated');
    }
  }

  constructor(private ngZone: NgZone) {
    console.log("CardComponent heeeeeeeere")
  }

     startCountdown() {
      if(this.sequence.length <= 15){
        this.time = this.sequence.length;
      }else{
        this.time = 15;
      }
        
      this.isPlaying = true;
      this.ngZone.runOutsideAngular(() => {
        const intervalId = setInterval(() => {
          this.ngZone.run(() => {
            this.time--;
            if (this.time <= 0) {
              clearInterval(intervalId); 
              this.dateStart = Date.now();
              this.isPlaying = false;
            }
          });
        }, 1000);
      });
    }
  

  shuffleSequence(): void {
    this.shuffledSequence = [...this.sequence];
    for (let i = this.shuffledSequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledSequence[i], this.shuffledSequence[j]] = [
        this.shuffledSequence[j],
        this.shuffledSequence[i],
      ];
    }
  }

  playSequence(): void {

    const sortedSequence = this.sequence.sort((a, b) => a.order - b.order);
    const delayPerCard = Math.min(15000, sortedSequence.length * 1000) / sortedSequence.length;

    sortedSequence.forEach((item, index) => {
      setTimeout(() => {
        this.illuminate(item.order);
      }, index * delayPerCard);
    });
  }

  private illuminate(order: number): void {
    this.cardStates[order] = 'active';
    setTimeout(() => {
      this.cardStates[order] = 'inactive';
    }, 500); 
  }

  onCardClick(card: Sequence): void {
    console.log('Card clicked:', card);
    this.playerSequence.playerSequence.push(card);  
    
  }
  
  validateSequence(): Answer {
    let timeRemaining = (Date.now() - this.dateStart ) / 1000;
    this.playerSequence.timeRemaining = timeRemaining;
    return this.playerSequence;
  }

  resetSequence(): void {
    this.playerSequence = { playerSequence: [], timeRemaining: 0 };
  }

  sequencePlaying(): boolean {
    return this.isPlaying;
  }

}
