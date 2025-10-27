import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/users';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  private _userService = inject(UserService);

  allUsers: User[] = [];

  // formgroups y formcontrols que se necesita






  // metodos que permitan hacer las peticiones y gestionar las respuestas

  showUsers() {

    this._userService.getUser().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUsers = res.data
        console.log(this.allUsers)
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      }
    });
  }


  deleteUser(id: string) {

    console.log("id del usuario a borrar ", id);

    this._userService.deleteUser(id).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "usuario eliminado",
          text: res.mensaje,
          icon: "success"

        }).then(() => {
          this.showUsers()
        })
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      }
    });

  }

  modifyUser(id: string) {

    console.log("id del usuario a actualizar", id)


  }
  ngOnInit(): void {
    this.showUsers();
  }
}