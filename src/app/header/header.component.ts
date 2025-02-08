import { Component, OnInit } from '@angular/core';
import { Route, RouteService } from './route.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../auth/models/user';
import { AuthService } from '../auth/service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthModule } from '../auth/auth.module';
import { LoginComponent } from '../auth/components/login/login.component';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    MatIconModule,
    LoginComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeadersComponent implements OnInit{
  routes: Route[] = [];
  currentUser: User | any = null;
  showLogin: boolean = false;


  constructor(private routeService: RouteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.routeService.getRoutes().subscribe((data) => {
      this.routes = data;
    });
    this.currentUser = this.authService.getCurrentUser(); // Récupérer l'utilisateur actuel
  }

  // toggleLogin() {
  //   this.showLogin = !this.showLogin; // Alterne l'affichage du formulaire de login
  // }

  onSubmit() {
    console.log('Login submitted');
    // Ajouter la logique de connexion ici
  }

  toggleLogin() {
    this.showLogin = !this.showLogin; // Alterne l'affichage du composant Login
  }
}
