/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MobileMarketTestModule } from '../../../test.module';
import { OrdineProdottoComponent } from 'app/entities/ordine-prodotto/ordine-prodotto.component';
import { OrdineProdottoService } from 'app/entities/ordine-prodotto/ordine-prodotto.service';
import { OrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

describe('Component Tests', () => {
  describe('OrdineProdotto Management Component', () => {
    let comp: OrdineProdottoComponent;
    let fixture: ComponentFixture<OrdineProdottoComponent>;
    let service: OrdineProdottoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [OrdineProdottoComponent],
        providers: []
      })
        .overrideTemplate(OrdineProdottoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdineProdottoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdineProdottoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrdineProdotto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordineProdottos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
