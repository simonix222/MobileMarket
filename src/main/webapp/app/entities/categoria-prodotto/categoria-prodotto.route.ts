import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';
import { CategoriaProdottoService } from './categoria-prodotto.service';
import { CategoriaProdottoComponent } from './categoria-prodotto.component';
import { CategoriaProdottoDetailComponent } from './categoria-prodotto-detail.component';
import { CategoriaProdottoUpdateComponent } from './categoria-prodotto-update.component';
import { CategoriaProdottoDeletePopupComponent } from './categoria-prodotto-delete-dialog.component';
import { ICategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';

@Injectable({ providedIn: 'root' })
export class CategoriaProdottoResolve implements Resolve<ICategoriaProdotto> {
  constructor(private service: CategoriaProdottoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoriaProdotto> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CategoriaProdotto>) => response.ok),
        map((categoriaProdotto: HttpResponse<CategoriaProdotto>) => categoriaProdotto.body)
      );
    }
    return of(new CategoriaProdotto());
  }
}

export const categoriaProdottoRoute: Routes = [
  {
    path: '',
    component: CategoriaProdottoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.categoriaProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategoriaProdottoDetailComponent,
    resolve: {
      categoriaProdotto: CategoriaProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.categoriaProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategoriaProdottoUpdateComponent,
    resolve: {
      categoriaProdotto: CategoriaProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.categoriaProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategoriaProdottoUpdateComponent,
    resolve: {
      categoriaProdotto: CategoriaProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.categoriaProdotto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const categoriaProdottoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CategoriaProdottoDeletePopupComponent,
    resolve: {
      categoriaProdotto: CategoriaProdottoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.categoriaProdotto.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
