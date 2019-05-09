import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { LoginModalService, AccountService, Account } from 'app/core';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
  providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  images = [
    '../../content/images/android-parts.jpg',
    '../../content/images/CRF-1523_Changing-the-way-we-think-about-mobile-ecommerce.png',
    '../../content/images/HTB1pxbHKFXXXXbeXVXXq6xXFXXX3.jpg',
    '../../content/images/rugged-smartphones.jpg',
    '../../content/images/pic.jpg',
    '../../content/images/photo.jpg',
    '../../content/images/photo2.jpg',
    '../../content/images/photo3.jpg'
  ];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    config: NgbCarouselConfig
  ) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
}
