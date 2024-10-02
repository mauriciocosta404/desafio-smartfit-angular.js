import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../services/get-units.service';
import { Location } from '../types/units-response.interface';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})

export class FormsComponent implements OnInit{
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private unitService: GetUnitsService,
  ){}

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe( data => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    });

    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });
  }

  

  onSubmit() {
    let { showClosed, hour } = this.formGroup.value;
    
    this.filteredResults = this.unitService.filter(this.results, showClosed, hour);
  }

  onCleanUp(): void{
    this.formGroup.reset();
  }
}
