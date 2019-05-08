import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProdotto } from 'app/shared/model/prodotto.model';

@Component({
  selector: 'jhi-prodotto-detail',
  templateUrl: './prodotto-detail.component.html'
})
export class ProdottoDetailComponent implements OnInit {
  prodotto: IProdotto;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ prodotto }) => {
      this.prodotto = prodotto;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
