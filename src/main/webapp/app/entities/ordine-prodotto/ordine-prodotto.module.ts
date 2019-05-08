import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MobileMarketSharedModule } from 'app/shared';
import {
  OrdineProdottoComponent,
  OrdineProdottoDetailComponent,
  OrdineProdottoUpdateComponent,
  OrdineProdottoDeletePopupComponent,
  OrdineProdottoDeleteDialogComponent,
  ordineProdottoRoute,
  ordineProdottoPopupRoute
} from './';

const ENTITY_STATES = [...ordineProdottoRoute, ...ordineProdottoPopupRoute];

@NgModule({
  imports: [MobileMarketSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdineProdottoComponent,
    OrdineProdottoDetailComponent,
    OrdineProdottoUpdateComponent,
    OrdineProdottoDeleteDialogComponent,
    OrdineProdottoDeletePopupComponent
  ],
  entryComponents: [
    OrdineProdottoComponent,
    OrdineProdottoUpdateComponent,
    OrdineProdottoDeleteDialogComponent,
    OrdineProdottoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MobileMarketOrdineProdottoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
