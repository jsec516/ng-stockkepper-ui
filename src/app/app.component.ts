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
    console.log("I am called for logout");
    e.preventDefault();
    this.authService.logout()
    .subscribe(item => {
      console.log('item returned ', item);
      this.router.navigateByUrl('/login');
    })
  }
}
