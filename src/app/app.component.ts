import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stock Keeper';
  activatedMenu = 'dashboard';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    router.events.subscribe(p => {
      if(p instanceof NavigationEnd) {
        if(/^\/request/g.test(p.urlAfterRedirects)) {
          this.activatedMenu = 'requests';
        } else if(/^\/purchase/g.test(p.urlAfterRedirects)) {
          this.activatedMenu = 'purchases';
        } else if(/^\/product/g.test(p.urlAfterRedirects)) {
          this.activatedMenu = 'products';
        } else {
          this.activatedMenu = 'dashboard';
        }
      }
    });
  }

  logout(e) {
    e.preventDefault();
    this.authService.logout()
      .subscribe(item => {
        this.router.navigateByUrl('/login');
      })
  }
}
