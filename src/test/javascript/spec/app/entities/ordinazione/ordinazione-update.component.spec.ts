/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MobileMarketTestModule } from '../../../test.module';
import { OrdinazioneUpdateComponent } from 'app/entities/ordinazione/ordinazione-update.component';
import { OrdinazioneService } from 'app/entities/ordinazione/ordinazione.service';
import { Ordinazione } from 'app/shared/model/ordinazione.model';

describe('Component Tests', () => {
  describe('Ordinazione Management Update Component', () => {
    let comp: OrdinazioneUpdateComponent;
    let fixture: ComponentFixture<OrdinazioneUpdateComponent>;
    let service: OrdinazioneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [OrdinazioneUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrdinazioneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdinazioneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdinazioneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ordinazione(123);
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
        const entity = new Ordinazione();
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
