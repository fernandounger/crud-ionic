import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './../services/product.service';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Tab1Page],
  providers:[ProductService]
})
export class Tab1PageModule {}
