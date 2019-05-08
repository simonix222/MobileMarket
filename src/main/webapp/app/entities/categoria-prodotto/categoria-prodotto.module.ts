import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MobileMarketSharedModule } from 'app/shared';
import {
  CategoriaProdottoComponent,
  CategoriaProdottoDetailComponent,
  CategoriaProdottoUpdateComponent,
  CategoriaProdottoDeletePopupComponent,
  CategoriaProdottoDeleteDialogComponent,
  categoriaProdottoRoute,
  categoriaProdottoPopupRoute
} from './';

const ENTITY_STATES = [...categoriaProdottoRoute, ...categoriaProdottoPopupRoute];

@NgModule({
  imports: [MobileMarketSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CategoriaProdottoComponent,
    CategoriaProdottoDetailComponent,
    CategoriaProdottoUpdateComponent,
    CategoriaProdottoDeleteDialogComponent,
    CategoriaProdottoDeletePopupComponent
  ],
  entryComponents: [
    CategoriaProdottoComponent,
    CategoriaProdottoUpdateComponent,
    CategoriaProdottoDeleteDialogComponent,
    CategoriaProdottoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MobileMarketCategoriaProdottoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
