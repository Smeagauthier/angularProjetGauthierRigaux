import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VillesService} from "../../services/villes.service";

@Component({
  selector: 'app-newville',
  templateUrl: './newville.component.html',
  styleUrls: ['./newville.component.css']
})
export class NewvilleComponent implements OnInit {

  villeFormGroup?: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private villeService: VillesService) {
  }

  ngOnInit(): void {
    this.villeFormGroup = this.fb.group({
      nom: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      pays: ['', Validators.required],
    });
  }

  onSaveVille(): void {
    this.submitted = true;
    if (this.villeFormGroup?.invalid) {
      return;
    }
    this.villeService.save(this.villeFormGroup?.value).subscribe({
      next : data => {alert("Ville ajoutée") ; alert("Numéro de la ville : "+data.idville)},
      error : err => alert(err.headers.get("error"))
    });
  }

}
