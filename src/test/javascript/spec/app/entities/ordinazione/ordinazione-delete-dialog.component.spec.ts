/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MobileMarketTestModule } from '../../../test.module';
import { OrdinazioneDeleteDialogComponent } from 'app/entities/ordinazione/ordinazione-delete-dialog.component';
import { OrdinazioneService } from 'app/entities/ordinazione/ordinazione.service';

describe('Component Tests', () => {
  describe('Ordinazione Management Delete Component', () => {
    let comp: OrdinazioneDeleteDialogComponent;
    let fixture: ComponentFixture<OrdinazioneDeleteDialogComponent>;
    let service: OrdinazioneService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [OrdinazioneDeleteDialogComponent]
      })
        .overrideTemplate(OrdinazioneDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdinazioneDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdinazioneService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
