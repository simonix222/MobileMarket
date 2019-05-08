import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

@Component({
  selector: 'jhi-ordine-prodotto-detail',
  templateUrl: './ordine-prodotto-detail.component.html'
})
export class OrdineProdottoDetailComponent implements OnInit {
  ordineProdotto: IOrdineProdotto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordineProdotto }) => {
      this.ordineProdotto = ordineProdotto;
    });
  }

  previousState() {
    window.history.back();
  }
}
