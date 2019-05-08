import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IProdotto, Prodotto } from 'app/shared/model/prodotto.model';
import { ProdottoService } from './prodotto.service';
import { ICategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';
import { CategoriaProdottoService } from 'app/entities/categoria-prodotto';

@Component({
  selector: 'jhi-prodotto-update',
  templateUrl: './prodotto-update.component.html'
})
export class ProdottoUpdateComponent implements OnInit {
  prodotto: IProdotto;
  isSaving: boolean;

  categoriaprodottos: ICategoriaProdotto[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descrizione: [],
    prezzo: [null, [Validators.required, Validators.min(0)]],
    immagine: [],
    immagineContentType: [],
    categoriaProdotto: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected prodottoService: ProdottoService,
    protected categoriaProdottoService: CategoriaProdottoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ prodotto }) => {
      this.updateForm(prodotto);
      this.prodotto = prodotto;
    });
    this.categoriaProdottoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategoriaProdotto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategoriaProdotto[]>) => response.body)
      )
      .subscribe((res: ICategoriaProdotto[]) => (this.categoriaprodottos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(prodotto: IProdotto) {
    this.editForm.patchValue({
      id: prodotto.id,
      nome: prodotto.nome,
      descrizione: prodotto.descrizione,
      prezzo: prodotto.prezzo,
      immagine: prodotto.immagine,
      immagineContentType: prodotto.immagineContentType,
      categoriaProdotto: prodotto.categoriaProdotto
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const prodotto = this.createFromForm();
    if (prodotto.id !== undefined) {
      this.subscribeToSaveResponse(this.prodottoService.update(prodotto));
    } else {
      this.subscribeToSaveResponse(this.prodottoService.create(prodotto));
    }
  }

  private createFromForm(): IProdotto {
    const entity = {
      ...new Prodotto(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descrizione: this.editForm.get(['descrizione']).value,
      prezzo: this.editForm.get(['prezzo']).value,
      immagineContentType: this.editForm.get(['immagineContentType']).value,
      immagine: this.editForm.get(['immagine']).value,
      categoriaProdotto: this.editForm.get(['categoriaProdotto']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProdotto>>) {
    result.subscribe((res: HttpResponse<IProdotto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackCategoriaProdottoById(index: number, item: ICategoriaProdotto) {
    return item.id;
  }
}
