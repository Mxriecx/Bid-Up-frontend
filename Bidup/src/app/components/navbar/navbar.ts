import { Component, OnDestroy, Renderer2, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Productservice } from '../../services/products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,                      // <- necesario si usas "imports" en el decorador
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private _productService = inject(Productservice);

  showpopup:boolean = false; 
  imageFile: File | null = null;

  productForm = new FormGroup({
    title:        new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    description:  new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    initialPrice: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0)] }),
    categories:   new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    state:        new FormControl<string>('')                         // opcional
  });

  

  popup(): void {
    this.showpopup = !this.showpopup;
    this.toggleBodyScroll(this.showpopup);
    if (!this.showpopup) {
      this.productForm.reset();
      this.imageFile = null;
    }
  }

  onFileSelected(evt: any): void {
    const input = evt.target.files[0];
    if (input){ 
      this.imageFile = input      
    }
  }

  submitProduct(event: Event): void {
    event.preventDefault();

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      Swal.fire({ icon: 'warning', title: 'Formulario incompleto', timer: 1600, showConfirmButton: false });
      return;
    }
    const nuevoProducto : FormData = new FormData();
    nuevoProducto.append('title',this.productForm.value.title || '')
    nuevoProducto.append('description',this.productForm.value.description || '')
    nuevoProducto.append('initialPrice', String(this.productForm.value.initialPrice ?? 0));
    nuevoProducto.append('category',this.productForm.value.categories || '')
    nuevoProducto.append('state',this.productForm.value.state || 'Por Subastar')
    nuevoProducto.append('image',this.imageFile || '')

    this._productService.postProduct(nuevoProducto).subscribe ({
      next : (res:any) => {
        console.log('respues post product', res)
        Swal.fire({
          title : 'Producto creado exitosamente',
          text : res.mensaje
        })
      },
      error:(error:any) =>{
        console.error(error)

      }
    })

  }

  ngOnDestroy(): void {
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(lock: boolean): void {
    const body = this.document?.body;
    if (!body) return;
    lock ? this.renderer.addClass(body, 'no-scroll') : this.renderer.removeClass(body, 'no-scroll');
  }
}
