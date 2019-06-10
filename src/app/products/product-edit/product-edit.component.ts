import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  id: string;
  name: string;
  code: string;
  image: string;
  price: string;

  constructor(private formBuiler: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  ngOnInit() {
    this.productForm = this.formBuiler.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      productImage: ['', Validators.required],
      productPrice: ['', Validators.required]
    });

  }

  getData(): void {
    this.productService.getProduct(this.id).subscribe(
      data => {
        this.name = data.productName;
        this.code = data.productCode;
        this.image = data.productImage;
        this.price = data.productPrice;
      }
    );
  }

  updateProduct(): void {
    const product = this.productForm.value;
    product.productId = this.id;
    this.productService.updateProduct(this.id, product).subscribe(
      data => console.log(data)
    );
    this.router.navigate(['products']);
  }

}
