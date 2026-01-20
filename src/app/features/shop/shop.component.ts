import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  categoryTitle = '';
  categoryDescription = '';

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category');
      if (category === 'men') {
        this.categoryTitle = "Men's Shoes";
        this.categoryDescription =
          'Lightweight, breathable, and sustainably crafted for him.';
      } else if (category === 'women') {
        this.categoryTitle = "Women's Shoes";
        this.categoryDescription =
          'Stylish, comfortable, and performance-ready styles for her.';
      } else {
        this.categoryTitle = 'New Arrivals';
        this.categoryDescription =
          'The latest and greatest sustainable styles.';
      }
    });
  }

  filters = {
    categories: [
      'Daily Running',
      'Trail Running',
      'Everyday Sneakers',
      'Slip-Ons',
      'High Tops',
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14],
    colors: [
      { name: 'Natural Black', hex: '#111111' },
      { name: 'Deep Red', hex: '#6d2626' },
      { name: 'Mist', hex: '#e5e7eb' },
      { name: 'Navy', hex: '#1e3a8a' },
      { name: 'Moss', hex: '#3f6212' },
    ],
  };

  products = [
    {
      id: '1',
      title: 'Wool Runner Mizzles',
      price: 125,
      category: 'Rain Ready',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/6I72382K3A7g3J71686629/1879038202970591b655938c53855567/WRM_Men_Natural_Grey_Cream_Sole_0.png',
    },
    {
      id: '2',
      title: 'Tree Dasher 2',
      price: 135,
      category: 'Everyday Running',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/1M22823614073357591c261621213233/TD2M_Natural_Black_Black_Sole_0.png',
    },
    {
      id: '3',
      title: 'Tree Flyer 2',
      price: 160,
      category: 'Distance Running',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/2z23882736183424151e592737667954/TF2M_Blizzard_White_Blizzard_Sole_0.png',
    },
    {
      id: '4',
      title: 'Wool Pipers',
      price: 110,
      category: 'Low Top',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/1X23956327338166946d849495761334/WP_Men_True_Black_Black_Sole_0.png',
    },
    {
      id: '5',
      title: 'Tree Runner Go',
      price: 120,
      category: 'Easy On',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/448148/7e7f7d30-28e4-4d8e-9086-749712128912.png',
    },
    {
      id: '6',
      title: 'Canvas Pipers',
      price: 105,
      category: 'Casual',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/482390/4d8525e6-6799-4672-9c3f-91a50a316b17.png',
    },
  ];

  isMobileFilterOpen = false;
  activeSort = 'Featured';
}
