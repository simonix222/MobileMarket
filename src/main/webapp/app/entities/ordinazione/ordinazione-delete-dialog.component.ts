import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdinazione } from 'app/shared/model/ordinazione.model';
import { OrdinazioneService } from './ordinazione.service';

@Component({
  selector: 'jhi-ordinazione-delete-dialog',
  templateUrl: './ordinazione-delete-dialog.component.html'
})
export class OrdinazioneDeleteDialogComponent {
  ordinazione: IOrdinazione;

  constructor(
    protected ordinazioneService: OrdinazioneService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ordinazioneService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ordinazioneListModification',
        content: 'Deleted an ordinazione'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ordinazione-delete-popup',
  template: ''
})
export class OrdinazioneDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ordinazione }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrdinazioneDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ordinazione = ordinazione;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ordinazione', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ordinazione', { outlets: { popup: null } }]);
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
