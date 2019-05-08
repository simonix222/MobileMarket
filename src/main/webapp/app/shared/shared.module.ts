import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MobileMarketSharedLibsModule, MobileMarketSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MobileMarketSharedLibsModule, MobileMarketSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MobileMarketSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MobileMarketSharedModule {
  static forRoot() {
    return {
      ngModule: MobileMarketSharedModule
    };
  }
}
