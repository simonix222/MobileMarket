import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';

type EntityResponseType = HttpResponse<ICategoriaProdotto>;
type EntityArrayResponseType = HttpResponse<ICategoriaProdotto[]>;

@Injectable({ providedIn: 'root' })
export class CategoriaProdottoService {
  public resourceUrl = SERVER_API_URL + 'api/categoria-prodottos';

  constructor(protected http: HttpClient) {}

  create(categoriaProdotto: ICategoriaProdotto): Observable<EntityResponseType> {
    return this.http.post<ICategoriaProdotto>(this.resourceUrl, categoriaProdotto, { observe: 'response' });
  }

  update(categoriaProdotto: ICategoriaProdotto): Observable<EntityResponseType> {
    return this.http.put<ICategoriaProdotto>(this.resourceUrl, categoriaProdotto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategoriaProdotto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategoriaProdotto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
