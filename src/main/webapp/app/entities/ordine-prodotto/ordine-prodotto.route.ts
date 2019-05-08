import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdineProdotto } from 'app/shared/model/ordine-prodotto.model';
import { OrdineProdottoService } from './ordine-prodotto.service';
import { OrdineProdottoComponent } from './ordine-prodotto.component';
import { OrdineProdottoDetailComponent } from './ordine-prodotto-detail.component';
import { OrdineProdottoUpdateComponent } from './ordine-prodotto-update.component';
import { OrdineProdottoDeletePopupComponent } from './ordine-prodotto-delete-dialog.component';
import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

@Injectable({ providedIn: 'root' })
export class OrdineProdottoResolve implements Resolve<IOrdineProdotto> {
  constructor(private service: OrdineProdottoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdineProdotto> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrdineProdotto>) => response.ok),
        map((ordineProdotto: HttpResponse<OrdineProdotto>) => ordineProdotto.body)
      );
    }
    return of(new OrdineProdotto());
  }
}

export const ordineProdottoRoute: Routes = [
  {
    path: '',
    component: OrdineProdottoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordineProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrdineProdottoDetailComponent,
    resolve: {
      ordineProdotto: OrdineProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordineProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrdineProdottoUpdateComponent,
    resolve: {
      ordineProdotto: OrdineProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordineProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrdineProdottoUpdateComponent,
    resolve: {
      ordineProdotto: OrdineProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordineProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ordineProdottoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrdineProdottoDeletePopupComponent,
    resolve: {
      ordineProdotto: OrdineProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordineProdotto.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
