/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MobileMarketTestModule } from '../../../test.module';
import { CategoriaProdottoDetailComponent } from 'app/entities/categoria-prodotto/categoria-prodotto-detail.component';
import { CategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';

describe('Component Tests', () => {
  describe('CategoriaProdotto Management Detail Component', () => {
    let comp: CategoriaProdottoDetailComponent;
    let fixture: ComponentFixture<CategoriaProdottoDetailComponent>;
    const route = ({ data: of({ categoriaProdotto: new CategoriaProdotto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [CategoriaProdottoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CategoriaProdottoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoriaProdottoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.categoriaProdotto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
