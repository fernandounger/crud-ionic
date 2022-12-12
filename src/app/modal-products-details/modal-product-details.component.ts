import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ProductService } from '../services/product.service';
import { Product } from './../model/product';

@Component({
  selector: 'app-modal-product-details',
  templateUrl: './modal-product-details.component.html',
  styleUrls: ['./modal-product-details.component.scss'],
})
export class ModalProductDetailsComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    private router: Router
  ) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  edit(id: number) {
    this.router.navigate(['/tabs/editar_prod', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.modalCtrl.dismiss(null, 'cancel');
      },
      error: () => {
        console.error(console.error);
      },
    });
  }

}
