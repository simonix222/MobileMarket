import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProdotto } from 'app/shared/model/prodotto.model';

type EntityResponseType = HttpResponse<IProdotto>;
type EntityArrayResponseType = HttpResponse<IProdotto[]>;

@Injectable({ providedIn: 'root' })
export class ProdottoService {
  public resourceUrl = SERVER_API_URL + 'api/prodottos';

  constructor(protected http: HttpClient) {}

  create(prodotto: IProdotto): Observable<EntityResponseType> {
    return this.http.post<IProdotto>(this.resourceUrl, prodotto, { observe: 'response' });
  }

  update(prodotto: IProdotto): Observable<EntityResponseType> {
    return this.http.put<IProdotto>(this.resourceUrl, prodotto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProdotto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProdotto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
