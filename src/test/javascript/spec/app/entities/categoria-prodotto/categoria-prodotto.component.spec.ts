/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MobileMarketTestModule } from '../../../test.module';
import { CategoriaProdottoComponent } from 'app/entities/categoria-prodotto/categoria-prodotto.component';
import { CategoriaProdottoService } from 'app/entities/categoria-prodotto/categoria-prodotto.service';
import { CategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';

describe('Component Tests', () => {
  describe('CategoriaProdotto Management Component', () => {
    let comp: CategoriaProdottoComponent;
    let fixture: ComponentFixture<CategoriaProdottoComponent>;
    let service: CategoriaProdottoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [CategoriaProdottoComponent],
        providers: []
      })
        .overrideTemplate(CategoriaProdottoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaProdottoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoriaProdottoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CategoriaProdotto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.categoriaProdottos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
