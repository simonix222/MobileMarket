import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';
import { AccountService } from 'app/core';
import { OrdineProdottoService } from './ordine-prodotto.service';

@Component({
  selector: 'jhi-ordine-prodotto',
  templateUrl: './ordine-prodotto.component.html'
})
export class OrdineProdottoComponent implements OnInit, OnDestroy {
  ordineProdottos: IOrdineProdotto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ordineProdottoService: OrdineProdottoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ordineProdottoService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrdineProdotto[]>) => res.ok),
        map((res: HttpResponse<IOrdineProdotto[]>) => res.body)
      )
      .subscribe(
        (res: IOrdineProdotto[]) => {
          this.ordineProdottos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrdineProdottos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrdineProdotto) {
    return item.id;
  }

  registerChangeInOrdineProdottos() {
    this.eventSubscriber = this.eventManager.subscribe('ordineProdottoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
