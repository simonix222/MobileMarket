import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

type EntityResponseType = HttpResponse<IOrdineProdotto>;
type EntityArrayResponseType = HttpResponse<IOrdineProdotto[]>;

@Injectable({ providedIn: 'root' })
export class OrdineProdottoService {
  public resourceUrl = SERVER_API_URL + 'api/ordine-prodottos';

  constructor(protected http: HttpClient) {}

  create(ordineProdotto: IOrdineProdotto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordineProdotto);
    return this.http
      .post<IOrdineProdotto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ordineProdotto: IOrdineProdotto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ordineProdotto);
    return this.http
      .put<IOrdineProdotto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrdineProdotto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrdineProdotto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ordineProdotto: IOrdineProdotto): IOrdineProdotto {
    const copy: IOrdineProdotto = Object.assign({}, ordineProdotto, {
      dataInserimento:
        ordineProdotto.dataInserimento != null && ordineProdotto.dataInserimento.isValid() ? ordineProdotto.dataInserimento.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataInserimento = res.body.dataInserimento != null ? moment(res.body.dataInserimento) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ordineProdotto: IOrdineProdotto) => {
        ordineProdotto.dataInserimento = ordineProdotto.dataInserimento != null ? moment(ordineProdotto.dataInserimento) : null;
      });
    }
    return res;
  }
}
