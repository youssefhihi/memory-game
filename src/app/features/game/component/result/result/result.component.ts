import { Component } from '@angular/core';
import { Result } from '../../../types/result';
import { ResultService } from '../../../service/result/result.service';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  results: Result[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit() {
    this.results = this.resultService.getResults();
  }
 
}
