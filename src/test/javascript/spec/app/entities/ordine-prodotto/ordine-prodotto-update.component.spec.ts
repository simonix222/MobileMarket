/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MobileMarketTestModule } from '../../../test.module';
import { OrdineProdottoUpdateComponent } from 'app/entities/ordine-prodotto/ordine-prodotto-update.component';
import { OrdineProdottoService } from 'app/entities/ordine-prodotto/ordine-prodotto.service';
import { OrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

describe('Component Tests', () => {
  describe('OrdineProdotto Management Update Component', () => {
    let comp: OrdineProdottoUpdateComponent;
    let fixture: ComponentFixture<OrdineProdottoUpdateComponent>;
    let service: OrdineProdottoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [OrdineProdottoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrdineProdottoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdineProdottoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdineProdottoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrdineProdotto(123);
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
        const entity = new OrdineProdotto();
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
