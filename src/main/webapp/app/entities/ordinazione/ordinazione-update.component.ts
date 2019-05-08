import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOrdinazione, Ordinazione } from 'app/shared/model/ordinazione.model';
import { OrdinazioneService } from './ordinazione.service';
import { IProdotto } from 'app/shared/model/prodotto.model';
import { ProdottoService } from 'app/entities/prodotto';
import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';
import { OrdineProdottoService } from 'app/entities/ordine-prodotto';

@Component({
  selector: 'jhi-ordinazione-update',
  templateUrl: './ordinazione-update.component.html'
})
export class OrdinazioneUpdateComponent implements OnInit {
  ordinazione: IOrdinazione;
  isSaving: boolean;

  prodottos: IProdotto[];

  ordineprodottos: IOrdineProdotto[];

  editForm = this.fb.group({
    id: [],
    quantita: [null, [Validators.required, Validators.min(0)]],
    prezzoTotale: [null, [Validators.required, Validators.min(0)]],
    stato: [null, [Validators.required]],
    prodotto: [null, Validators.required],
    ordine: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ordinazioneService: OrdinazioneService,
    protected prodottoService: ProdottoService,
    protected ordineProdottoService: OrdineProdottoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ordinazione }) => {
      this.updateForm(ordinazione);
      this.ordinazione = ordinazione;
    });
    this.prodottoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProdotto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProdotto[]>) => response.body)
      )
      .subscribe((res: IProdotto[]) => (this.prodottos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.ordineProdottoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOrdineProdotto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrdineProdotto[]>) => response.body)
      )
      .subscribe((res: IOrdineProdotto[]) => (this.ordineprodottos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ordinazione: IOrdinazione) {
    this.editForm.patchValue({
      id: ordinazione.id,
      quantita: ordinazione.quantita,
      prezzoTotale: ordinazione.prezzoTotale,
      stato: ordinazione.stato,
      prodotto: ordinazione.prodotto,
      ordine: ordinazione.ordine
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ordinazione = this.createFromForm();
    if (ordinazione.id !== undefined) {
      this.subscribeToSaveResponse(this.ordinazioneService.update(ordinazione));
    } else {
      this.subscribeToSaveResponse(this.ordinazioneService.create(ordinazione));
    }
  }

  private createFromForm(): IOrdinazione {
    const entity = {
      ...new Ordinazione(),
      id: this.editForm.get(['id']).value,
      quantita: this.editForm.get(['quantita']).value,
      prezzoTotale: this.editForm.get(['prezzoTotale']).value,
      stato: this.editForm.get(['stato']).value,
      prodotto: this.editForm.get(['prodotto']).value,
      ordine: this.editForm.get(['ordine']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdinazione>>) {
    result.subscribe((res: HttpResponse<IOrdinazione>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProdottoById(index: number, item: IProdotto) {
    return item.id;
  }

  trackOrdineProdottoById(index: number, item: IOrdineProdotto) {
    return item.id;
  }
}
