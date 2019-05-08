import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';
import { OrdineProdottoService } from './ordine-prodotto.service';

@Component({
  selector: 'jhi-ordine-prodotto-delete-dialog',
  templateUrl: './ordine-prodotto-delete-dialog.component.html'
})
export class OrdineProdottoDeleteDialogComponent {
  ordineProdotto: IOrdineProdotto;

  constructor(
    protected ordineProdottoService: OrdineProdottoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ordineProdottoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ordineProdottoListModification',
        content: 'Deleted an ordineProdotto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ordine-prodotto-delete-popup',
  template: ''
})
export class OrdineProdottoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordineProdotto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrdineProdottoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ordineProdotto = ordineProdotto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ordine-prodotto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ordine-prodotto', { outlets: { popup: null } }]);
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
