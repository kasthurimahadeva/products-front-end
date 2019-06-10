import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Products';
  products: Product[];
  popoverTitle = 'Delete';
  popoverMessage = 'Are sure want delete this?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private productService: ProductService,
              public toastr: ToastrManager
    ) {
    this.getData();
   }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.productService.getProductsList()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => console.log(error));
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log('success');
        this.toastr.successToastr('Product deleted!.', 'Success!');
        this.getData();
      }
    );
  }

}
