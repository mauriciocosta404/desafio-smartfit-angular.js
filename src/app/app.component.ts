import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from "./components/forms/forms.component";
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from "./components/cards-list/cards-list.component";
import { CommonModule } from '@angular/common';
import { Location } from './types/units-response.interface';
import { GetUnitsService } from './services/get-units.service';
import { LegendComponent } from "./components/legend/legend.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsComponent, CardsListComponent, CommonModule, LegendComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'desafio-smartfit-angular';

  showList = new BehaviorSubject(false);
  unitsList : Location[] = [];

  constructor(private unitService: GetUnitsService){}

  onSubmit = () => {
    this.showList.next(true);
    this.unitsList = this.unitService.getFilteredUnits();
  }
}
