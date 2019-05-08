import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';
import { CategoriaProdottoService } from './categoria-prodotto.service';

@Component({
  selector: 'jhi-categoria-prodotto-delete-dialog',
  templateUrl: './categoria-prodotto-delete-dialog.component.html'
})
export class CategoriaProdottoDeleteDialogComponent {
  categoriaProdotto: ICategoriaProdotto;

  constructor(
    protected categoriaProdottoService: CategoriaProdottoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.categoriaProdottoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'categoriaProdottoListModification',
        content: 'Deleted an categoriaProdotto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-categoria-prodotto-delete-popup',
  template: ''
})
export class CategoriaProdottoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categoriaProdotto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CategoriaProdottoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.categoriaProdotto = categoriaProdotto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/categoria-prodotto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/categoria-prodotto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
