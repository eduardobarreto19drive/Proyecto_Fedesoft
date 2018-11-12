import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {LEVELS, QUESTIONS} from '../providers/constant';
import 'rxjs/Rx';

@Injectable()
export class MyService {
    private http;

    constructor(http:Http) {
        this.http = http;
    }

    /**
     * Gets the levels.json for Quiz Level
     * @returns Array of levels
     */
    getLevels() {
        return this.http.get(LEVELS)
            .map((res:Response) => res.json().levels);
    }

    /**
     * Gets the questions.json for test page     *
     * @returns Array of questions and answers
     */
    getQuestions(){
        return this.http.get(QUESTIONS)
            .map((res:Response) => res.json().questions);
    }

}