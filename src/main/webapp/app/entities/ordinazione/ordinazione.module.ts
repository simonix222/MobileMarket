import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MobileMarketSharedModule } from 'app/shared';
import {
  OrdinazioneComponent,
  OrdinazioneDetailComponent,
  OrdinazioneUpdateComponent,
  OrdinazioneDeletePopupComponent,
  OrdinazioneDeleteDialogComponent,
  ordinazioneRoute,
  ordinazionePopupRoute
} from './';

const ENTITY_STATES = [...ordinazioneRoute, ...ordinazionePopupRoute];

@NgModule({
  imports: [MobileMarketSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdinazioneComponent,
    OrdinazioneDetailComponent,
    OrdinazioneUpdateComponent,
    OrdinazioneDeleteDialogComponent,
    OrdinazioneDeletePopupComponent
  ],
  entryComponents: [OrdinazioneComponent, OrdinazioneUpdateComponent, OrdinazioneDeleteDialogComponent, OrdinazioneDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MobileMarketOrdinazioneModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
