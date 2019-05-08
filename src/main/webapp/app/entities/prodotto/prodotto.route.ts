import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Prodotto } from 'app/shared/model/prodotto.model';
import { ProdottoService } from './prodotto.service';
import { ProdottoComponent } from './prodotto.component';
import { ProdottoDetailComponent } from './prodotto-detail.component';
import { ProdottoUpdateComponent } from './prodotto-update.component';
import { ProdottoDeletePopupComponent } from './prodotto-delete-dialog.component';
import { IProdotto } from 'app/shared/model/prodotto.model';

@Injectable({ providedIn: 'root' })
export class ProdottoResolve implements Resolve<IProdotto> {
  constructor(private service: ProdottoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProdotto> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Prodotto>) => response.ok),
        map((prodotto: HttpResponse<Prodotto>) => prodotto.body)
      );
    }
    return of(new Prodotto());
  }
}

export const prodottoRoute: Routes = [
  {
    path: '',
    component: ProdottoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.prodotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProdottoDetailComponent,
    resolve: {
      prodotto: ProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.prodotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProdottoUpdateComponent,
    resolve: {
      prodotto: ProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.prodotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProdottoUpdateComponent,
    resolve: {
      prodotto: ProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.prodotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const prodottoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProdottoDeletePopupComponent,
    resolve: {
      prodotto: ProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.prodotto.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
