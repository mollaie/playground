import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {Swiper} from 'swiper';
@Component({
  selector: 'app-notifications',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab4Page implements AfterViewInit{

  config = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true
    }
  };


  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  constructor() {}

  // Any methods or logic for handling user interactions or loading data
}