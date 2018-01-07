import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stock Keeper';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  logout(e) {
    e.preventDefault();
    this.authService.logout()
    .subscribe(item => {
      this.router.navigateByUrl('/login');
    })
  }
}
