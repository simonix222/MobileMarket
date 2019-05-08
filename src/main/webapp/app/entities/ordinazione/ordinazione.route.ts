import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ordinazione } from 'app/shared/model/ordinazione.model';
import { OrdinazioneService } from './ordinazione.service';
import { OrdinazioneComponent } from './ordinazione.component';
import { OrdinazioneDetailComponent } from './ordinazione-detail.component';
import { OrdinazioneUpdateComponent } from './ordinazione-update.component';
import { OrdinazioneDeletePopupComponent } from './ordinazione-delete-dialog.component';
import { IOrdinazione } from 'app/shared/model/ordinazione.model';

@Injectable({ providedIn: 'root' })
export class OrdinazioneResolve implements Resolve<IOrdinazione> {
  constructor(private service: OrdinazioneService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdinazione> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ordinazione>) => response.ok),
        map((ordinazione: HttpResponse<Ordinazione>) => ordinazione.body)
      );
    }
    return of(new Ordinazione());
  }
}

export const ordinazioneRoute: Routes = [
  {
    path: '',
    component: OrdinazioneComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordinazione.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrdinazioneDetailComponent,
    resolve: {
      ordinazione: OrdinazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordinazione.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrdinazioneUpdateComponent,
    resolve: {
      ordinazione: OrdinazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordinazione.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrdinazioneUpdateComponent,
    resolve: {
      ordinazione: OrdinazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordinazione.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ordinazionePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrdinazioneDeletePopupComponent,
    resolve: {
      ordinazione: OrdinazioneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mobileMarketApp.ordinazione.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
