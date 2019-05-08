/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MobileMarketTestModule } from '../../../test.module';
import { OrdinazioneComponent } from 'app/entities/ordinazione/ordinazione.component';
import { OrdinazioneService } from 'app/entities/ordinazione/ordinazione.service';
import { Ordinazione } from 'app/shared/model/ordinazione.model';

describe('Component Tests', () => {
  describe('Ordinazione Management Component', () => {
    let comp: OrdinazioneComponent;
    let fixture: ComponentFixture<OrdinazioneComponent>;
    let service: OrdinazioneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [OrdinazioneComponent],
        providers: []
      })
        .overrideTemplate(OrdinazioneComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdinazioneComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdinazioneService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ordinazione(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ordinaziones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
