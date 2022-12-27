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
      nom: ['', [Validators.required, Validators.pattern("^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿñÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÒÓÔÕÖÙÚÛÜÝŸÑ -]+$")]],
      latitude: ['', [Validators.required, Validators.pattern("^[0-9]{2}([.][0-9]{4})$")]],
      longitude: ['', [Validators.required, Validators.pattern("^[0-9]{2}([.][0-9]{4})$")]],
      pays: ['', [Validators.required, Validators.pattern("^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿñÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÒÓÔÕÖÙÚÛÜÝŸÑ -]+$")]],
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
