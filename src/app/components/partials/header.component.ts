import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FBAuthService } from 'src/app/models/fb-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input() title?: string;

  constructor(public auth: FBAuthService, private router: Router) { }

  logout() {
    if (confirm('Are you sure?')) {
      this.auth.clear();
      this.router.navigateByUrl("/");
    }
  }
}
