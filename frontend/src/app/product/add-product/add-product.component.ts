import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.services';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styles: [`
    .form-field { margin-bottom: 1rem; }
    .error { color: #c00; font-size: 0.9rem; }
    .actions { margin-top: 1rem; }
    input[type="number"] { width: 200px; }
  `]
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get name(): AbstractControl | null { return this.productForm.get('name'); }
  get description(): AbstractControl | null { return this.productForm.get('description'); }
  get price(): AbstractControl | null { return this.productForm.get('price'); }
  get stock(): AbstractControl | null { return this.productForm.get('stock'); }

  submit(): void {
    if (!this.productForm) return;
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const payload: Product = {
      name: this.name?.value,
      description: this.description?.value,
      price: Number(this.price?.value),
      stock: Number(this.stock?.value)
    };

    this.submitting = true;
    this.productService.create(payload).subscribe({
      next: () => {
        this.submitting = false;
        alert('Producto creado correctamente');
        this.router.navigate(['/products/list']);
      },
      error: (err) => {
        this.submitting = false;
        console.error('Create product error', err);
        alert('Ocurrió un error al crear el producto');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products/list']);
  }
}
