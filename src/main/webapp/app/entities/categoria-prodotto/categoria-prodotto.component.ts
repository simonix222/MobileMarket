import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';
import { AccountService } from 'app/core';
import { CategoriaProdottoService } from './categoria-prodotto.service';

@Component({
  selector: 'jhi-categoria-prodotto',
  templateUrl: './categoria-prodotto.component.html'
})
export class CategoriaProdottoComponent implements OnInit, OnDestroy {
  categoriaProdottos: ICategoriaProdotto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected categoriaProdottoService: CategoriaProdottoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.categoriaProdottoService
      .query()
      .pipe(
        filter((res: HttpResponse<ICategoriaProdotto[]>) => res.ok),
        map((res: HttpResponse<ICategoriaProdotto[]>) => res.body)
      )
      .subscribe(
        (res: ICategoriaProdotto[]) => {
          this.categoriaProdottos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCategoriaProdottos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICategoriaProdotto) {
    return item.id;
  }

  registerChangeInCategoriaProdottos() {
    this.eventSubscriber = this.eventManager.subscribe('categoriaProdottoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
