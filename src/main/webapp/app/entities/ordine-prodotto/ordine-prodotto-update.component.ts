import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrdineProdotto, OrdineProdotto } from 'app/shared/model/ordine-prodotto.model';
import { OrdineProdottoService } from './ordine-prodotto.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
  selector: 'jhi-ordine-prodotto-update',
  templateUrl: './ordine-prodotto-update.component.html'
})
export class OrdineProdottoUpdateComponent implements OnInit {
  ordineProdotto: IOrdineProdotto;
  isSaving: boolean;

  clientes: ICliente[];

  editForm = this.fb.group({
    id: [],
    dataInserimento: [null, [Validators.required]],
    stato: [null, [Validators.required]],
    codice: [null, [Validators.required]],
    cliente: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ordineProdottoService: OrdineProdottoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ordineProdotto }) => {
      this.updateForm(ordineProdotto);
      this.ordineProdotto = ordineProdotto;
    });
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ordineProdotto: IOrdineProdotto) {
    this.editForm.patchValue({
      id: ordineProdotto.id,
      dataInserimento: ordineProdotto.dataInserimento != null ? ordineProdotto.dataInserimento.format(DATE_TIME_FORMAT) : null,
      stato: ordineProdotto.stato,
      codice: ordineProdotto.codice,
      cliente: ordineProdotto.cliente
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ordineProdotto = this.createFromForm();
    if (ordineProdotto.id !== undefined) {
      this.subscribeToSaveResponse(this.ordineProdottoService.update(ordineProdotto));
    } else {
      this.subscribeToSaveResponse(this.ordineProdottoService.create(ordineProdotto));
    }
  }

  private createFromForm(): IOrdineProdotto {
    const entity = {
      ...new OrdineProdotto(),
      id: this.editForm.get(['id']).value,
      dataInserimento:
        this.editForm.get(['dataInserimento']).value != null
          ? moment(this.editForm.get(['dataInserimento']).value, DATE_TIME_FORMAT)
          : undefined,
      stato: this.editForm.get(['stato']).value,
      codice: this.editForm.get(['codice']).value,
      cliente: this.editForm.get(['cliente']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdineProdotto>>) {
    result.subscribe((res: HttpResponse<IOrdineProdotto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }
}
