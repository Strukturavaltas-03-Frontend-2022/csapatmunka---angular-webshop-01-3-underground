import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
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
import { FeaturedComponent } from './page/featured/featured.component';
import { SalesComponent } from './page/sales/sales.component';
import { ProductCardComponent } from './common/product-card/product-card.component';
import { ProductSliderComponent } from './common/product-slider/product-slider.component';
import { ProductListComponent } from './common/product-list/product-list.component';
import { Select5Pipe } from './pipes/select5.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
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
    FeaturedComponent,
    SalesComponent,
    ProductCardComponent,
    ProductSliderComponent,
    ProductListComponent,
    Select5Pipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
