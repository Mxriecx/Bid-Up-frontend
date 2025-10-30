import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Reviews } from '../../interfaces/reviews';
import { ReviewSite } from '../../services/reviews';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass, NgFor, NgIf],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})

export class newReviews implements OnInit {

  currentUserId: string = 'user123';
  private _reviewSite = inject(ReviewSite);
  private _router = inject(Router);
  // Lista de reseñas iniciales
  reviews: Reviews[] = [];
  //   {
  //     id: 1,
  //     userId: 'user123',
  //     user: 'Laura Wilson',
  //     comments: 'Great product, really happy with it. Will definitely recommend to others.',
  //     score: 5,
  //     date: 'Feb 12, 2024'
  //   },
  //   {
  //     id: 2,
  //     userId: 'user456',
  //     user: 'John Doe',
  //     comments: 'Good value for the price. The product meets my expectations.',
  //     score: 4,
  //     date: 'Feb 10, 2024'
  //   }
  // ];

  // Nueva reseña temporal (cuando el usuario escribe)
  newReview: Reviews = {
    id: 0,
    userId: this.currentUserId,
    user: '',
    comments: '',
    score: 0,
    date: new Date().toDateString()
  };

  ngOnInit(): void {

    this._reviewSite.getReview().subscribe({
      next: (response: any) => {
        this.reviews = response.data;
        console.log(this.reviews)
      },
      error: (err: any) => {
        console.error(err.mensaje);
      }
    });
    return;
  }

  private storageKey = 'reviews'
  private saveAllToStorage(): void {
    try {
      return localStorage.setItem(this.storageKey, JSON.stringify(this.reviews));
    } catch (err) {
      console.error('No se pudo guardar en localStorage', err);
    }
  }
  // Agregar una nueva reseña
  addReview(): void {
    if (!this.newReview.user || !this.newReview.comments || this.newReview.score === 0) {
      alert('Por favor completa todos los campos y selecciona las estrellas.');
    }

    const review: Reviews = {
      ...this.newReview,
      id: Date.now(),
      date: new Date().toDateString(),
      user: ''
    };

    this.reviews.unshift(review);
    this.newReview = { id: 0, userId: this.currentUserId, user: '', comments: '', score: 0, date: new Date().toDateString() };

    this.saveAllToStorage();
    this._reviewSite.postReview(review).subscribe();
  }

  // Cambiar entre modo edición y vista normal
  editReview(review: Reviews): void {
    if (review.userId !== this.currentUserId) {
      alert('Sólo puedes editar tu propia reseña');
      return;
    }
    review.editable = !review.editable;
  }

  // Guardar los cambios al comentario
  saveReview(review: Reviews): void {
    review.editable = false;
    review.date = new Date().toLocaleString();
    this.saveAllToStorage();
  }
  private saved = localStorage.getItem('reviews');
  // private reviewObj = JSON.parse(this.saved);
  // console.log(reviewObj.); 

  // Borra reseñas
  clearReviews() {
    localStorage.removeItem('reviews');
    this.reviews = [];
  }


  // Cambiar la cantidad de estrellas (tanto para nueva reseña como editadas)
  setStars(target: Reviews, value: number): void {
    target.score = value;
    this.saveAllToStorage();
  }



  getDefaultReviews() {
    return [

      {
        id: 1,
        userId: 'user123',
        user: 'Laura Wilson',
        comments: 'Great product, really happy with it. Will definitely recommend to others.',
        score: 5,
        date: 'Feb 12, 2024'
      },
      {
        id: 2,
        userId: 'user456',
        user: 'John Doe',
        comments: 'Good value for the price. The product meets my expectations.',
        score: 4,
        date: 'Feb 10, 2024'
      }
    ]
  };


  private loadFromStorageOrDefault(): Reviews[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return this.getDefaultReviews();
    }
    try {
      return JSON.parse(raw) as Reviews[];
    } catch {
      return this.getDefaultReviews();
    }
  }
};
