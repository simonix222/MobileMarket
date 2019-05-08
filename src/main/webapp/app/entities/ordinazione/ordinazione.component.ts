import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdinazione } from 'app/shared/model/ordinazione.model';
import { AccountService } from 'app/core';
import { OrdinazioneService } from './ordinazione.service';

@Component({
  selector: 'jhi-ordinazione',
  templateUrl: './ordinazione.component.html'
})
export class OrdinazioneComponent implements OnInit, OnDestroy {
  ordinaziones: IOrdinazione[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ordinazioneService: OrdinazioneService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ordinazioneService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrdinazione[]>) => res.ok),
        map((res: HttpResponse<IOrdinazione[]>) => res.body)
      )
      .subscribe(
        (res: IOrdinazione[]) => {
          this.ordinaziones = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrdinaziones();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrdinazione) {
    return item.id;
  }

  registerChangeInOrdinaziones() {
    this.eventSubscriber = this.eventManager.subscribe('ordinazioneListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
