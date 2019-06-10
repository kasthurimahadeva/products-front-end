import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(private formBuiler: FormBuilder,
              private productService: ProductService,
              private router: Router,
              public toastr: ToastrManager
              ) { }

  ngOnInit() {
    this.productForm = this.formBuiler.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      productImage: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
  }

  saveProduct(): void {
    const product = this.productForm.value;
    product.productId = '001';
    this.productService.saveProduct(product).subscribe(
      response => {
          if (response.status === 200) {
            console.log('Success');
            this.toastr.successToastr('Product ' + product.productName + ' added!.', 'Success!');
          }
      },
      error => {
          console.error(error);
      }
    );

    this.router.navigate(['products']);
  }

}
