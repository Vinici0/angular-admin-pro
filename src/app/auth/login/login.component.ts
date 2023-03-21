import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
//Como no se tiene el paquete de google, se debe de declarar como any
declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  public auth2: any;
  public formSubmitted = false;

  public loginForm = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    remember: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}
  ngAfterViewInit(): void {
    this.googleInit();
  }


  login() {
    this.formSubmitted = true;
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem(
            'email',
            this.loginForm.get('email')?.value || ''
          );
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err.error.msg);
      }
    );
    console.log(this.loginForm.value);
  }


  googleInit() {
    google.accounts.id.initialize({
      client_id:
        "234828725258-vj7ppojei10l24rfkm970n4jna86b6iq.apps.googleusercontent.com",
        //Muhco cuidado con el this, para que el servcio puede ser inyectado
      callback: (response:any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      document.getElementById("my-signin2"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    console.log(response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe((resp) => {
      console.log({ login: resp });
      this.router.navigateByUrl('/');
    });
  }


  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    // this.attachSignin( document.getElementById('my-signin2') );
  };

  // attachSignin(element: any) {
  //   this.auth2.attachClickHandler(
  //     element,
  //     {},
  //     (googleUser: any) => {
  //       const id_token = googleUser.getAuthResponse().id_token;
  //       // console.log(id_token);
  //       this.usuarioService.loginGoogle(id_token).subscribe((resp) => {
  //         // Navegar al Dashboard
  //         this.ngZone.run(() => {
  //           this.router.navigateByUrl('/');
  //         });
  //       });
  //     },
  //     (error: any) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     }
  //   );
  // }
}
