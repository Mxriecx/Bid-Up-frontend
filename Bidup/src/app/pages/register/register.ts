import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/users';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private _userService = inject(UserService);
  private _router = inject(Router);

  // Vista previa de imagen
  previewUrl: string | null = null;

  // Formulario reactivo
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    age: new FormControl<number | null>(null),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    image: new FormControl<File | null>(null)
  });

  // Captura archivo y genera vista previa
  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.registerForm.patchValue({ image: file });
      this.registerForm.get('image')?.updateValueAndValidity();

      // Genera vista previa temporal
      this.previewUrl = URL.createObjectURL(file);
      console.log("Archivo seleccionado:", file);
    }
  }

  // Enviar datos al backend
  handleSubmit() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos obligatorios.',
        icon: 'warning'
      });
      return;
    }

    // Crear FormData para enviar archivos + datos
    const formData = new FormData();
    formData.append("name", this.registerForm.value.name || "");
    formData.append("username", this.registerForm.value.username || "");
    formData.append("email", this.registerForm.value.email || "");
    formData.append("age", String(this.registerForm.value.age || 0));
    formData.append("password", this.registerForm.value.password || "");

    const imageFile = this.registerForm.value.image as File | null;
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Llamada al backend
    this._userService.postUser(formData).subscribe({
      next: (res: any) => {
        console.log("Respuesta del backend:", res);
        Swal.fire({
          title: "¡Registro exitoso!",
          text: res.mensaje,
          icon: "success"
        }).then(() => {
          this._router.navigate(['/login']);
        });
      },
      error: (err: any) => {
        console.error("Error en el registro:", err);
        Swal.fire({
          title: "Error",
          text: err.error?.mensaje || "Error al registrar usuario.",
          icon: "error"
        });
      }
    });
  }
}
