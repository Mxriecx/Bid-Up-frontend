import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/users';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  private _userService = inject(UserService);
   baseUrl: string = environment.appUrl;
  allUsers: User[] = [];
  selectedUser: User | null = null;

  ngOnInit(): void {
    this.showUsers();
  }

  showUsers() {
    this._userService.getUser().subscribe({
      next: (res: any) => {
        console.log("🧑 Usuarios recibidos:", res.data);
        this.allUsers = res.data;
      },
      error: (err: any) => console.error(err.error.mensaje)
    });
  }

  deleteUser(id: string) {
    this._userService.deleteUser(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Usuario eliminado",
          text: res.mensaje,
          icon: "success"
        }).then(() => this.showUsers());
      },
      error: (err: any) => console.error(err.error.mensaje)
    });
  }

  // 🔹 Abre el modal con los datos del usuario
  modifyUser(id: string) {
    const user = this.allUsers.find(u => u._id === id);
    if (user) {
      this.selectedUser = { ...user };
      const modalEl = document.getElementById('editUserModal');
      if (modalEl) {
        const modal = new (window as any).bootstrap.Modal(modalEl);
        modal.show();
      }
    }
  }

  // 🔹 Actualiza el usuario
  updateUser() {
    if (!this.selectedUser) return;

    this._userService.updateUser(this.selectedUser._id!, this.selectedUser)
      .subscribe({
        next: () => {
          Swal.fire('✅ Éxito', 'Usuario actualizado correctamente', 'success');
          this.showUsers();

          const modalEl = document.getElementById('editUserModal');
          const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
          modal.hide();
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('❌ Error', 'No se pudo actualizar el usuario', 'error');
        }
      });
  }
}
