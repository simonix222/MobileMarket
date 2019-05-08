/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MobileMarketTestModule } from '../../../test.module';
import { ProdottoUpdateComponent } from 'app/entities/prodotto/prodotto-update.component';
import { ProdottoService } from 'app/entities/prodotto/prodotto.service';
import { Prodotto } from 'app/shared/model/prodotto.model';

describe('Component Tests', () => {
  describe('Prodotto Management Update Component', () => {
    let comp: ProdottoUpdateComponent;
    let fixture: ComponentFixture<ProdottoUpdateComponent>;
    let service: ProdottoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [ProdottoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProdottoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProdottoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProdottoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Prodotto(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Prodotto();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
