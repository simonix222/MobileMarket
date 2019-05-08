import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdinazione } from 'app/shared/model/ordinazione.model';

@Component({
  selector: 'jhi-ordinazione-detail',
  templateUrl: './ordinazione-detail.component.html'
})
export class OrdinazioneDetailComponent implements OnInit {
  ordinazione: IOrdinazione;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordinazione }) => {
      this.ordinazione = ordinazione;
    });
  }

  previousState() {
    window.history.back();
  }
}
