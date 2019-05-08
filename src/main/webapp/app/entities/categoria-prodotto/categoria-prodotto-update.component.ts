import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategoriaProdotto, CategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';
import { CategoriaProdottoService } from './categoria-prodotto.service';

@Component({
  selector: 'jhi-categoria-prodotto-update',
  templateUrl: './categoria-prodotto-update.component.html'
})
export class CategoriaProdottoUpdateComponent implements OnInit {
  categoriaProdotto: ICategoriaProdotto;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descrizione: []
  });

  constructor(
    protected categoriaProdottoService: CategoriaProdottoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ categoriaProdotto }) => {
      this.updateForm(categoriaProdotto);
      this.categoriaProdotto = categoriaProdotto;
    });
  }

  updateForm(categoriaProdotto: ICategoriaProdotto) {
    this.editForm.patchValue({
      id: categoriaProdotto.id,
      nome: categoriaProdotto.nome,
      descrizione: categoriaProdotto.descrizione
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const categoriaProdotto = this.createFromForm();
    if (categoriaProdotto.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriaProdottoService.update(categoriaProdotto));
    } else {
      this.subscribeToSaveResponse(this.categoriaProdottoService.create(categoriaProdotto));
    }
  }

  private createFromForm(): ICategoriaProdotto {
    const entity = {
      ...new CategoriaProdotto(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descrizione: this.editForm.get(['descrizione']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaProdotto>>) {
    result.subscribe((res: HttpResponse<ICategoriaProdotto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
