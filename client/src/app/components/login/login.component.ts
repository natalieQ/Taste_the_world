import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../authguards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) { 
    this.createForm();
  }

createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    });
  }


  disableForm() {
    this.form.controls['username'].disable(); 
    this.form.controls['password'].disable(); 
  }

  enableForm() {
    this.form.controls['username'].enable(); 
    this.form.controls['password'].enable(); 
  }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    // Create user object from input
    const user = {
      username: this.form.get('username').value, 
      password: this.form.get('password').value 
    }

    // send login data to service -> backend
    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message; 
        this.processing = false; 
        this.enableForm(); 
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        // store user's token in browser for later retrieval
        this.authService.storeUserData(data.token, data.user);

        setTimeout(() => {
          if (this.previousUrl) {   // redirect to page user was on previously
            this.router.navigate([this.previousUrl]); 
          } else {
            this.router.navigate(['/home']);
          }
        }, 2000);
      }
    });
  }


  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger';
      this.message = 'Please login before viewing the page';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

}
