import { IonicModule } from '@ionic/angular';
import { ModalProductDetailsComponent } from './modal-product-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ModalProductDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalProductDetailsComponent]
})
export class ModalProductDetailsModule { }
