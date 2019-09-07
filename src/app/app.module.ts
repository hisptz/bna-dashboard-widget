import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoFilledInputComponent } from './components/data-item/auto-filled-input/auto-filled-input.component';
import { SelectBoxInputComponent } from './components/data-item/select-box-input/select-box-input.component';
import { TextAreaInputComponent } from './components/data-item/text-area-input/text-area-input.component';
import { WidgetContextMenuComponent } from './components/widget-context-menu/widget-context-menu.component';
import { WidgetItemLoaderComponent } from './components/widget-item-loader/widget-item-loader.component';
import { WidgetNotificationBarComponent } from './components/widget-notification-bar/widget-notification-bar.component';
import { directives } from './directives';
import { BnaWidgetComponent } from './pages/bna-widget/bna-widget.component';
import { HomeComponent } from './pages/home/home.component';
import { effects, metaReducers, reducers } from './store';
import { RouteSerializer } from './utils';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BnaWidgetComponent,
    AutoFilledInputComponent,
    SelectBoxInputComponent,
    TextAreaInputComponent,
    WidgetItemLoaderComponent,
    WidgetNotificationBarComponent,
    WidgetContextMenuComponent,
    ...directives
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,

    FormsModule,

    NgxDhis2HttpClientModule.forRoot({
      version: 1,
      namespace: 'iapps',
      models: {}
    }),

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
    StoreRouterConnectingModule.forRoot(),

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
