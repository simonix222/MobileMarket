import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProdotto } from 'app/shared/model/prodotto.model';
import { ProdottoService } from './prodotto.service';

@Component({
  selector: 'jhi-prodotto-delete-dialog',
  templateUrl: './prodotto-delete-dialog.component.html'
})
export class ProdottoDeleteDialogComponent {
  prodotto: IProdotto;

  constructor(protected prodottoService: ProdottoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.prodottoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'prodottoListModification',
        content: 'Deleted an prodotto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-prodotto-delete-popup',
  template: ''
})
export class ProdottoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ prodotto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProdottoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.prodotto = prodotto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/prodotto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/prodotto', { outlets: { popup: null } }]);
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
