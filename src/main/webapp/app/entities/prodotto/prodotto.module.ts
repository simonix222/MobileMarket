import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MobileMarketSharedModule } from 'app/shared';
import {
  ProdottoComponent,
  ProdottoDetailComponent,
  ProdottoUpdateComponent,
  ProdottoDeletePopupComponent,
  ProdottoDeleteDialogComponent,
  prodottoRoute,
  prodottoPopupRoute
} from './';

const ENTITY_STATES = [...prodottoRoute, ...prodottoPopupRoute];

@NgModule({
  imports: [MobileMarketSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProdottoComponent,
    ProdottoDetailComponent,
    ProdottoUpdateComponent,
    ProdottoDeleteDialogComponent,
    ProdottoDeletePopupComponent
  ],
  entryComponents: [ProdottoComponent, ProdottoUpdateComponent, ProdottoDeleteDialogComponent, ProdottoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MobileMarketProdottoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
