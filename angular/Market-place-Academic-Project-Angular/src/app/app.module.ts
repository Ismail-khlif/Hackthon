import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import {FormsModule} from "@angular/forms";
import { OffresEmploiComponentComponent } from './offres-emploi-component/offres-emploi-component.component';
import { ArticlesComponentComponent } from './articles-component/articles-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailproductComponent } from './detailproduct/detailproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { TemplateDrivenFormComponentComponent } from './template-driven-form-component/template-driven-form-component.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {HttpClientModule} from "@angular/common/http";
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { LoginComponent } from './login/login.component';
import { InvestCampaignComponent } from './invest-campaign/invest-campaign.component';
import { TransferNftComponent } from './transfer-nft/transfer-nft.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OffresEmploiComponentComponent,
    ArticlesComponentComponent,
    NavbarComponent,
    NotfoundComponent,
    DetailproductComponent,
    AddproductComponent,
    TemplateDrivenFormComponentComponent,
    ProductItemComponent,
    CampaignListComponent,
    CreateCampaignComponent,
    CampaignDetailsComponent,
    LoginComponent,
    InvestCampaignComponent,
    TransferNftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
