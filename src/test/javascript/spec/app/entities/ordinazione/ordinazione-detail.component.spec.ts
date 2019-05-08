/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MobileMarketTestModule } from '../../../test.module';
import { OrdinazioneDetailComponent } from 'app/entities/ordinazione/ordinazione-detail.component';
import { Ordinazione } from 'app/shared/model/ordinazione.model';

describe('Component Tests', () => {
  describe('Ordinazione Management Detail Component', () => {
    let comp: OrdinazioneDetailComponent;
    let fixture: ComponentFixture<OrdinazioneDetailComponent>;
    const route = ({ data: of({ ordinazione: new Ordinazione(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MobileMarketTestModule],
        declarations: [OrdinazioneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OrdinazioneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdinazioneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordinazione).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
