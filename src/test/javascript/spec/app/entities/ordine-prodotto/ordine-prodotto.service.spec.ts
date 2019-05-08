/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OrdineProdottoService } from 'app/entities/ordine-prodotto/ordine-prodotto.service';
import { IOrdineProdotto, OrdineProdotto, StatoOrdine } from 'app/shared/model/ordine-prodotto.model';

describe('Service Tests', () => {
  describe('OrdineProdotto Service', () => {
    let injector: TestBed;
    let service: OrdineProdottoService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrdineProdotto;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(OrdineProdottoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OrdineProdotto(0, currentDate, StatoOrdine.COMPLETATO, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dataInserimento: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a OrdineProdotto', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataInserimento: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataInserimento: currentDate
          },
          returnedFromService
        );
        service
          .create(new OrdineProdotto(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a OrdineProdotto', async () => {
        const returnedFromService = Object.assign(
          {
            dataInserimento: currentDate.format(DATE_TIME_FORMAT),
            stato: 'BBBBBB',
            codice: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataInserimento: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of OrdineProdotto', async () => {
        const returnedFromService = Object.assign(
          {
            dataInserimento: currentDate.format(DATE_TIME_FORMAT),
            stato: 'BBBBBB',
            codice: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataInserimento: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OrdineProdotto', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
