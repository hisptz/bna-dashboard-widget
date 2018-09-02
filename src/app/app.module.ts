import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { reducers, metaReducers, effects } from './store';
import { RouteSerializer } from './utils';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BnaWidgetComponent } from './pages/bna-widget/bna-widget.component';
import { AutoFilledInputComponent } from './components/data-item/auto-filled-input/auto-filled-input.component';
import { SelectBoxInputComponent } from './components/data-item/select-box-input/select-box-input.component';
import { TextAreaInputComponent } from './components/data-item/text-area-input/text-area-input.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BnaWidgetComponent,
    AutoFilledInputComponent,
    SelectBoxInputComponent,
    TextAreaInputComponent
  ],
  imports: [
    BrowserModule,

    HttpClientModule,

    AppRoutingModule,

    ReactiveFormsModule,

    FormsModule,

    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),

    /**
     * Module for registering ngrx store reducers
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule,

    /**
     * Module for registering ngrx store side effects
     */
    EffectsModule.forRoot(effects),

    /**
     * Development tool for debugging ngrx store operations
     */
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
