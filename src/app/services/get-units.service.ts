import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location, UnitsResponse } from '../types/units-response.interface';

const OPENNING_CLOSE_HOURS = {
  morning: {
    begin: '06',
    end: '12'
  },
  afternoon: {
    begin: '12',
    end: '18'
  },
  night:{
    begin: '18',
    end: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  private allUnits: Location[] = []; 
  
  constructor(private httpClient: HttpClient) {}
  
  getAllUnits(): Observable<UnitsResponse>{
    return this.httpClient.get<UnitsResponse>(this.apiUrl);
  }

  transformWeekday(weekday: number){
    const dias: { [key: number]: string }  = {
      0: 'Dom.',
      6: 'Sáb'
    }

    return dias[weekday] || 'Seg. à Sex.';
  }

  filterUnits(unit: Location, open_hour: string, close_hour: string){
    if(!unit.schedules) return true;

    let open_hour_filter = parseInt(open_hour, 10);
    let close_hour_filter = parseInt(close_hour, 10);

    let todays_weekday =  this.transformWeekday(new Date().getDay());

    for(let i=0; i< unit.schedules.length; i++){
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;
      
      if(todays_weekday === schedule_weekday){
        if(schedule_hour !== 'Fechada'){
            let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ');

            let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10);
            let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10);	

            if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
            
            return false;
        }
      }
    }

    return false;
  }

  filter(results: Location[], showClosed: boolean, hour: string){
    let intermediateResults = results;

    if(showClosed) {
      intermediateResults = results.filter((location) => location.opened === true);
    }
    
    if(hour) {
      const open_hour = OPENNING_CLOSE_HOURS[hour as  HOUR_INDEXES].begin;
      const close_hour = OPENNING_CLOSE_HOURS[hour as  HOUR_INDEXES].end;
      return intermediateResults.filter((location) => this.filterUnits(location, open_hour, close_hour));
    } else {
      return intermediateResults;
    }
  }
}
