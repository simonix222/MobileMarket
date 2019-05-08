import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProdotto } from 'app/shared/model/prodotto.model';
import { AccountService } from 'app/core';
import { ProdottoService } from './prodotto.service';

@Component({
  selector: 'jhi-prodotto',
  templateUrl: './prodotto.component.html'
})
export class ProdottoComponent implements OnInit, OnDestroy {
  prodottos: IProdotto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected prodottoService: ProdottoService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.prodottoService
      .query()
      .pipe(
        filter((res: HttpResponse<IProdotto[]>) => res.ok),
        map((res: HttpResponse<IProdotto[]>) => res.body)
      )
      .subscribe(
        (res: IProdotto[]) => {
          this.prodottos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProdottos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProdotto) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInProdottos() {
    this.eventSubscriber = this.eventManager.subscribe('prodottoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
