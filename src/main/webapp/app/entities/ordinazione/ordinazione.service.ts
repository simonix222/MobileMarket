import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrdinazione } from 'app/shared/model/ordinazione.model';

type EntityResponseType = HttpResponse<IOrdinazione>;
type EntityArrayResponseType = HttpResponse<IOrdinazione[]>;

@Injectable({ providedIn: 'root' })
export class OrdinazioneService {
  public resourceUrl = SERVER_API_URL + 'api/ordinaziones';

  constructor(protected http: HttpClient) {}

  create(ordinazione: IOrdinazione): Observable<EntityResponseType> {
    return this.http.post<IOrdinazione>(this.resourceUrl, ordinazione, { observe: 'response' });
  }

  update(ordinazione: IOrdinazione): Observable<EntityResponseType> {
    return this.http.put<IOrdinazione>(this.resourceUrl, ordinazione, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrdinazione>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrdinazione[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
