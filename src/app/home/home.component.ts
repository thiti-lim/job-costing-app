import { Customer } from './../models/customer.model';
import { JobService } from 'src/app/job/job.service';
import { CustomerService } from './../customer/customer.service';
import { Component, Inject } from '@angular/core';
import { Job } from '../models/job.model';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { Subject, filter, takeUntil } from 'rxjs';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pageTitle: string = 'dashboard';
  private readonly _destroy$ = new Subject<void>();
  isLoggedIn: boolean = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG)
    private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {}
  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.isLoggedIn = this.authService.instance.getAllAccounts().length > 0;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200',
    });
  }
}
