import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  playerName: string = '';

  constructor(private router: Router) {}

  startGame(): void {
    if (this.playerName.trim()) {
      localStorage.setItem('playerName', this.playerName);
      this.router.navigate(['/game']); 
    } else {
      alert('Please enter your name before starting the game.');
    }
  }
}
