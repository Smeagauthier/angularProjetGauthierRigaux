import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Etape} from "../../entities/etape.entities";
import {EtapesService} from "../../services/etapes.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-newetape',
  templateUrl: './newetape.component.html',
  styleUrls: ['./newetape.component.css']
})
export class NewetapeComponent implements OnInit {
  @Input() vilactdep?: FormGroup;
  @Input() vilactarr?: FormGroup;
  @Output() newEtape = new EventEmitter<Etape>();
  etapeFormGroup?: FormGroup;
  submitted = false;
  et?: Etape;

  constructor(private fb: FormBuilder, private etapesService: EtapesService) {
  }

  ngOnInit(): void {
    this.etapeFormGroup = this.fb.group({
      idetape: [],
      numero:[],
      description:[],
      dateetape: [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      km:[]
    });
  }

  onSaveEtapeDepart(): void {
    this.submitted = true;
    this.etapesService.saveDep(this.etapeFormGroup?.value, this.vilactdep?.value).subscribe({
      next: data => {
        alert('sauvegarde OK');
        this.et = data;
        this.newEtape.emit(data)
      },
      error: err => alert(err.headers.get("error"))
    });
  }

  onSaveEtapeArrivee(): void {
    this.submitted = true;
    this.etapesService.saveArr(this.etapeFormGroup?.value, this.vilactarr?.value).subscribe({
      next: data => {
        alert('sauvegarde OK');
        this.et = data;
        this.newEtape.emit(data)
      },
      error: err => alert(err.headers.get("error"))
    });
  }
}
