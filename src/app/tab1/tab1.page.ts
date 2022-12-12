import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './../model/product';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  productForm!: FormGroup;
  product!:Product;

  editable:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      amount: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern(/^[0-9]+$/)] ],
      purchasePrice: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      percetage: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      salePrice: ['', []],
      provider: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });

    this.route.paramMap.subscribe(params => {

      const productId = +params.get('id')!;

      if(productId) {
        this.productService.findProduct(productId).subscribe({

          next: (productDB: Product) => {

            this.product = productDB;
            this.editable = true;
            this.loadForm();
            
          },
          error: (err) => console.log(err)

        });
      }
    });
}

  addProduct() {

    const newProduct = this.productForm.getRawValue() as Product;

    this.productService.insertProduct(newProduct)
    .subscribe({
      next: (result:any) => {

        this.productForm.reset();
        console.info('[AddProduct]', result);
        this.router.navigateByUrl('/tabs/tab2');

      },

      error: (error:any) => { console.log(error) }
    });
  }

  loadForm() {
    this.productForm.patchValue({

      name: this.product.name,
      amount: this.product.amount,
      purchasePrice: this.product.purchasePrice,
      percetage: this.product.percetage,
      salePrice: this.product.salePrice,
      provider: this.product.provider

    });
  }

  calculateSale() {
    let purchaseValueProduct = this.productForm.get('purchasePrice')?.value;
    let percetageProduct = this.productForm.get('percetage')?.value;

    let saleCalculate = purchaseValueProduct + (purchaseValueProduct * (percetageProduct / 100))
    this.productForm.patchValue({
      salePrice : saleCalculate
    })

  }

}
