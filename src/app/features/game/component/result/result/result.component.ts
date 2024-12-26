import { Component } from '@angular/core';
import { Result } from '../../../types/result';
import { ResultService } from '../../../service/result/result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  results: Result[] = [];

  constructor(private resultService: ResultService, private router: Router) {}

  ngOnInit() {
    this.results = this.resultService.getResults();
  }

  exitGame() {
    localStorage.removeItem('playerName');
    this.resultService.clearResults();
    this.router.navigate(['']);
  }

}
