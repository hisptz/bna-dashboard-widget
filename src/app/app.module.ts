import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { EffectsModule } from '@ngrx/effects';
import {
  DefaultRouterStateSerializer,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BnaWidgetComponent } from './components/bna-widget/bna-widget.component';
import { DataItemComponent } from './components/data-item/data-item.component';
import { WidgetItemLoaderComponent } from './components/widget-item-loader/widget-item-loader.component';
import { WidgetNotificationBarComponent } from './components/widget-notification-bar/widget-notification-bar.component';
import { directives } from './directives';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { effects, metaReducers, reducers } from './store';
import { RouteSerializer } from './utils';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BnaWidgetComponent,
    WidgetItemLoaderComponent,
    WidgetNotificationBarComponent,
    DataItemComponent,
    ...directives,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,

    AppRoutingModule,

    FormsModule,

    NgxDhis2HttpClientModule.forRoot({
      version: 1,
      namespace: 'iapps',
      models: {},
    }),

    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),

    /**
     * Module for registering ngrx store reducers
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),

    /**
     * Module for registering ngrx store side effects
     */
    EffectsModule.forRoot(effects),

    /**
     * Development tool for debugging ngrx store operations
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
