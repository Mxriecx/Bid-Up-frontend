import { Component, OnDestroy, Renderer2, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar', //la etiqueta de html
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  showpopup = false;

  popup(): void {
    this.showpopup = !this.showpopup;
    this.toggleBodyScroll(this.showpopup);
  }

  submitProduct(event: Event): void {
    event.preventDefault();
    // TODO: integrar con el servicio de productos
  }

  ngOnDestroy(): void {
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(lock: boolean): void {
    const body = this.document?.body;
    if (!body) {
      return;
    }

    if (lock) {
      this.renderer.addClass(body, 'no-scroll');
    } else {
      this.renderer.removeClass(body, 'no-scroll');
    }
  }
}
