import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';

@Component({
  selector: 'jhi-categoria-prodotto-detail',
  templateUrl: './categoria-prodotto-detail.component.html'
})
export class CategoriaProdottoDetailComponent implements OnInit {
  categoriaProdotto: ICategoriaProdotto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categoriaProdotto }) => {
      this.categoriaProdotto = categoriaProdotto;
    });
  }

  previousState() {
    window.history.back();
  }
}
