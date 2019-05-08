import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'prodotto',
        loadChildren: './prodotto/prodotto.module#MobileMarketProdottoModule'
      },
      {
        path: 'categoria-prodotto',
        loadChildren: './categoria-prodotto/categoria-prodotto.module#MobileMarketCategoriaProdottoModule'
      },
      {
        path: 'cliente',
        loadChildren: './cliente/cliente.module#MobileMarketClienteModule'
      },
      {
        path: 'ordine-prodotto',
        loadChildren: './ordine-prodotto/ordine-prodotto.module#MobileMarketOrdineProdottoModule'
      },
      {
        path: 'ordinazione',
        loadChildren: './ordinazione/ordinazione.module#MobileMarketOrdinazioneModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MobileMarketEntityModule {}
