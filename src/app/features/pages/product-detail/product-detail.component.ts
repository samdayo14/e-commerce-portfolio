import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  selectedSize: number | null = null;
  selectedColor: string = 'Deep Red';

  product = {
    title: "Men's Trail Runners SWT",
    price: 145,
    rating: 4.8,
    reviews: 2101,
    description:
      'The Trail Runner is sustainably-engineered and intentionally designed for durability, comfort, and performance no matter where the day leads.',

    images: [
      'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1000/cms/448148/7e7f7d30-28e4-4d8e-9086-749712128912.png', // Side
      'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1000/cms/482390/4d8525e6-6799-4672-9c3f-91a50a316b17.png', // Sole
      'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1000/cms/448168/e437077a-268e-49b8-a736-231a44136453.png', // Top
    ],

    colors: [
      { name: 'Deep Red', hex: '#6d2626' },
      { name: 'Natural Black', hex: '#111111' },
      { name: 'Hazy Beige', hex: '#d2b48c' },
    ],

    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14],
  };

  selectSize(size: number) {
    this.selectedSize = size;
  }

  selectColor(colorName: string) {
    this.selectedColor = colorName;
  }

  addToCart() {
    if (!this.selectedSize) return;
    console.log(
      `Added to Cart: ${this.product.title} (Size: ${this.selectedSize}, Color: ${this.selectedColor})`
    );
  }
}
