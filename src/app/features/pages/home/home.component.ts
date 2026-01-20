import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, ButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  featuredProducts = [
    {
      id: '1',
      title: 'Wool Runner Mizzles',
      price: 125,
      category: "Men's Running",
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/6I72382K3A7g3J71686629/1879038202970591b655938c53855567/WRM_Men_Natural_Grey_Cream_Sole_0.png',
    },
    {
      id: '2',
      title: 'Tree Dasher 2',
      price: 135,
      category: 'Everyday',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/1M22823614073357591c261621213233/TD2M_Natural_Black_Black_Sole_0.png',
    },
    {
      id: '3',
      title: 'Wool Pipers',
      price: 110,
      category: 'Casual',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/1X23956327338166946d849495761334/WP_Men_True_Black_Black_Sole_0.png',
    },
    {
      id: '4',
      title: 'Tree Flyer 2',
      price: 160,
      category: 'Performance',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/2z23882736183424151e592737667954/TF2M_Blizzard_White_Blizzard_Sole_0.png',
    },

    {
      id: '5',
      title: 'Wool Dasher Mizzle',
      price: 145,
      category: 'Rain Ready',
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/448148/7e7f7d30-28e4-4d8e-9086-749712128912.png',
    },
  ];
}
