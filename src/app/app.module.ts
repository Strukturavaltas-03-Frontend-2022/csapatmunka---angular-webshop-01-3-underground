import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Cat01Component } from './page/cat01/cat01.component';
import { Cat02Component } from './page/cat02/cat02.component';
import { HomeComponent } from './page/home/home.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SalePipe } from './pipes/sale.pipe';
import { ModalComponent } from './util/modal/modal.component';
import { FiltersComponent } from './util/filters/filters.component';
import { FilterByGenrePipe } from './pipes/filter-by-genre.pipe';
import { FilterByDiscountPipe } from './pipes/filter-by-discount.pipe';
import { FilterByPricePipe } from './pipes/filter-by-price.pipe';
import { FilterByTitlePipe } from './pipes/filter-by-title.pipe';
import { FilterByF2pPipe } from './pipes/filter-by-f2p.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    Cat01Component,
    Cat02Component,
    HomeComponent,
    CurrencyPipe,
    SalePipe,
    ModalComponent,
    FiltersComponent,
    FilterByGenrePipe,
    FilterByDiscountPipe,
    FilterByPricePipe,
    FilterByTitlePipe,
    FilterByF2pPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
