import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../services/get-units.service';
import {HttpClient} from "@angular/common/http"

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})

export class FormsComponent implements OnInit{
  results = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private unitService: GetUnitsService,
  ){}

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe(data=> console.log(data));

    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false,
    });
  }

  onSubmit(): void{
    console.log(this.formGroup.value);
  }

  onCleanUp(): void{
    this.formGroup.reset();
  }
}
