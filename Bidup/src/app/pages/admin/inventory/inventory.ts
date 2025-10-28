import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productservice } from '../../../services/products';
import { Product } from '../../../interfaces/product';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {

  private _productService = inject(Productservice);
  allProducts: Product[] = [];
  baseUrl: string = environment.appUrl;

  // 🔹 Nuevo: producto seleccionado para editar
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    this.showProducts();
  }

  showProducts() {
    this._productService.getProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.data;
      },
      error: (err: any) => console.error(err.error.mensaje)
    });
  }

  deleteProduct(id: string) {
    this._productService.deleteProducts(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Producto eliminado",
          text: res.mensaje,
          icon: "success"
        }).then(() => this.showProducts());
      },
      error: (err: any) => console.error(err.error.mensaje)
    });
  }

  // 🔹 Abre el modal de edición
  modifyProduct(id: string) {
    const product = this.allProducts.find(p => p._id === id);
    if (product) {
      this.selectedProduct = { ...product };
      const modalEl = document.getElementById('editModal');
      if (modalEl) {
        const modal = new (window as any).bootstrap.Modal(modalEl);
        modal.show();
      }
    }
  }

  // 🔹 Actualiza el producto
  updateProduct() {
    if (!this.selectedProduct) return;

    this._productService.updateProduct(this.selectedProduct._id!, this.selectedProduct)
      .subscribe({
        next: () => {
          Swal.fire('✅ Éxito', 'Producto actualizado correctamente', 'success');
          this.showProducts();

          const modalEl = document.getElementById('editModal');
          const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
          modal.hide();
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('❌ Error', 'No se pudo actualizar el producto', 'error');
        }
      });
  }
}
