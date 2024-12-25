import { Sequence } from './sequence';
export interface Result {
    id: number;
    score: number;
    level: number;
    sequenceChosen: Sequence[];
    sequenceCorrect: Sequence[];
}