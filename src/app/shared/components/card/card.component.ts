import { Sequence } from './../../../features/game/types/sequence';
import { Component, Input, SimpleChanges } from '@angular/core';
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
export class CardComponent {
 @Input() sequence: Sequence[] = [];
  shuffledSequence: Sequence[] = [];
  playerSequence: Sequence[] = [];
  cardStates: { [key: number]: string } = {};

  ngOnInit(): void {
      this.shuffleSequence();
      console.log('ngOnInit is called!');
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['sequence']) {
  //     // Whenever the 'sequence' array changes, call shuffleSequence
  //     console.log('Sequence changed:', changes['sequence']);
  //     this.shuffleSequence();
  //   }
  // }

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
    this.playerSequence.push(card);  
  }

  getPalyerSequence(): Sequence[] {
    return this.playerSequence;
  }
}
