import { beforeEachProviders, it, describe, expect, inject } from '@angular/core/testing';
import {TeamService} from './team-service';
 
/** First test */
describe('Team Service', () => {
 
    it('should do nothing', () => {
 
        expect(true).toBeTruthy();
 
    });
 
});

describe('Team Service error', () => {
 
    it('should do nothing', () => {
 
        expect(true).not.toBeTruthy(); //can also use .toBeFalsy();
 
    });
 
});

describe('Magic 8 Ball Service', () => {
 
    it('should do nothing', () => {
 
        expect(true).toBeTruthy();
        expect(1 + 1).toBe(2);
        expect(2 + 2).toBe(5); //this will fail
 
    });
 
});