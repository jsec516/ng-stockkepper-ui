import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  model:any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.model = {
      username: null,
      password: null
    };
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model.username, this.model.password)
    .subscribe(data => {
      this.router.navigateByUrl('/dashboard');
    })
  }
}
