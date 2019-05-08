/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MobileMarketTestModule } from '../../../test.module';
import { CategoriaProdottoUpdateComponent } from 'app/entities/categoria-prodotto/categoria-prodotto-update.component';
import { CategoriaProdottoService } from 'app/entities/categoria-prodotto/categoria-prodotto.service';
import { CategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';

describe('Component Tests', () => {
  describe('CategoriaProdotto Management Update Component', () => {
    let comp: CategoriaProdottoUpdateComponent;
    let fixture: ComponentFixture<CategoriaProdottoUpdateComponent>;
    let service: CategoriaProdottoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [CategoriaProdottoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategoriaProdottoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaProdottoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoriaProdottoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategoriaProdotto(123);
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
        const entity = new CategoriaProdotto();
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
