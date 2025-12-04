import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.services';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styles: ``
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (items: Product[]) => {
        this.products = items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.loading = false;
        alert('Error al cargar productos');
      }
    });
  }

  onDelete(id?: string): void {
    if (!id) return;
    const confirmed = confirm('Esta seguro que desea eliminar el registro');
    if (!confirmed) return;

    this.productService.remove(id).subscribe({
      next: () => {
        // actualizar la lista localmente sin recargar toda la página
        this.products = this.products.filter(p => p._id !== id);
        alert('Producto eliminado correctamente');
      },
      error: (err) => {
        console.error('Error deleting product', err);
        alert('Error al eliminar el producto');
      }
    });
  }

  onEdit(id?: string): void {
    if (!id) return;
    alert(`Editar producto id: ${id}`);
    // futuro: navegar a la ruta de edición
    // this.router.navigate(['/products/edit', id]);
  }
}
