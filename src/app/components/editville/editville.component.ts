import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {VillesService} from "../../services/villes.service";

@Component({
  selector: 'app-editville',
  templateUrl: './editville.component.html',
  styleUrls: ['./editville.component.css']
})
export class EditvilleComponent implements OnInit {
  villeFormGroup?: FormGroup;
  submitted = false;
  idville: number;

  constructor(private villesService: VillesService, private fb:
    FormBuilder, activatedRoute: ActivatedRoute) {
    this.idville = activatedRoute.snapshot.params.idville;
  }

  ngOnInit(): void {
    this.villesService.getVille(this.idville).subscribe(
      ville => {
        this.villeFormGroup = this.fb.group({
          idville: [ville.idville, Validators.required],
          nom: [ville.nom, Validators.required],
          latitude: [ville.latitude, Validators.required],
          longitude: [ville.longitude, Validators.required],
          pays: [ville.pays, Validators.required]
        })
      });
  }

  onUpdateVille(): void {
    this.submitted = true;
    if (this.villeFormGroup?.invalid) {
      return;
    }

    this.villesService.updateVille(this.villeFormGroup?.value).subscribe(data => {
        alert('maj ok')
      },
      err => {
        alert(err.headers.get("error"));
      });
  }
}
