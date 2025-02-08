import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeadersComponent } from '../header/header.component';
import { TechnologiesComponent } from '../technologies/technologies.component';
import { BlogService } from '../blog/services/blog.service';
import { publishBlog } from '../blog/models/publish-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Blog } from '../blog/models/blog.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header/header.component';
import { BlogListComponent } from '../blog/component/blog-list/blog-list.component';
import { BlogModule } from '../blog/blog.module';
import { ImageHoverService } from '../image-hover.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeadersComponent,
    TechnologiesComponent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    BlogModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  blogs: Blog[] = [];
  loading: boolean = true;  // Pour afficher un indicateur de chargement
  error: string | null = null;  // Gestion des erreurs

  email: string = '';
  confirmationMessage: string | null = null;
  iconAtEnd: boolean = false; // Pour gérer la position de l'icône

  constructor(
    private blogService: BlogService,
    private imageHoverService: ImageHoverService
  ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors du chargement des blogs.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  sendEmail() {
    if (this.email) {
      console.log(`Email envoyé à : ${this.email}`);
      this.confirmationMessage = 'Votre email a été envoyé avec succès ! 🎉';

      this.email = '';

      setTimeout(() => {
        this.confirmationMessage = null;
      }, 5000);
    }
  }

  moveIconToEnd() {
    this.iconAtEnd = true;
  }

  moveIconToStart() {
    this.iconAtEnd = false;
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.imageHoverService.enlargeImage(target);
    }
  }

  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.imageHoverService.resetImage(target);
    }
  }

}
