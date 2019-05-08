/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MobileMarketTestModule } from '../../../test.module';
import { OrdineProdottoDetailComponent } from 'app/entities/ordine-prodotto/ordine-prodotto-detail.component';
import { OrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

describe('Component Tests', () => {
  describe('OrdineProdotto Management Detail Component', () => {
    let comp: OrdineProdottoDetailComponent;
    let fixture: ComponentFixture<OrdineProdottoDetailComponent>;
    const route = ({ data: of({ ordineProdotto: new OrdineProdotto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [OrdineProdottoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrdineProdottoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdineProdottoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordineProdotto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
