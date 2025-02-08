// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { Blog } from '../../models/blog.model';
// import { CommonModule } from '@angular/common';
// import { User } from '../../../auth/models/user';
// import { GroupModel } from '../../models/group.model';
// import { AuthService } from '../../../auth/service/auth.service';
// import { GroupService } from '../../services/group.service';

// @Component({
//   selector: 'app-group-blog-list',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule
//   ],
//   templateUrl: './group-blog-list.component.html',
//   styleUrl: './group-blog-list.component.scss'
// })
// export class GroupBlogListComponent implements OnInit{

//   groupId!: number;
//   sharedBlogs: Blog[] = [];
//   group!: GroupModel;
//   currentUser!: User;


//   constructor(
//     private route: ActivatedRoute, 
//     private http: HttpClient,
//     private groupService: GroupService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.groupId = +this.route.snapshot.paramMap.get('id')!;
//     const groupId = +this.route.snapshot.paramMap.get('id')!;
//     this.loadGroup(groupId);
//     this.authService.currentUser$.subscribe((user) => {
//       if (user) {
//         this.currentUser = user;
//       }
//     });
//     this.loadSharedBlogs();
//   }

//   loadSharedBlogs(): void {
//     this.http.get<any[]>(`http://localhost:3000/groupShares?groupId=${this.groupId}`).subscribe(
//       (shares) => {
//         const blogIds = shares.map((share) => share.blogId);
//         this.fetchBlogs(blogIds);
//       },
//       (error) => console.error('Erreur lors du chargement des blogs partagés:', error)
//     );
//   }

//   fetchBlogs(blogIds: number[]): void {
//     if (blogIds.length > 0) {
//       this.http.get<Blog[]>(`http://localhost:3000/blogs?id=${blogIds.join('&id=')}`).subscribe(
//         (blogs) => (this.sharedBlogs = blogs),
//         (error) => console.error('Erreur lors du chargement des blogs:', error)
//       );
//     }
//   }


//   loadGroup(groupId: number): void {
//     this.groupService.getGroupById(groupId).subscribe(
//       (group) => (this.group = group),
//       (error) => console.error('Erreur lors du chargement du groupe:', error)
//     );
//   }

//   joinGroup(): void {
//     if (!this.currentUser) return;

//     // Vérification si l'utilisateur est déjà membre
//     if (this.group.members.some(member => member.id === this.currentUser.id)) {
//       alert('Vous êtes déjà membre de ce groupe.');
//       return;
//     }

//     // Appel du service pour ajouter l'utilisateur au groupe
//     this.groupService.joinGroup(this.group.id!, this.currentUser).subscribe(
//       (updatedGroup) => {
//         this.group = updatedGroup;  // Met à jour le groupe après l'ajout de l'utilisateur
//         alert('Vous avez rejoint le groupe avec succès !');
//       },
//       (error) => {
//         console.error('Erreur lors de l\'ajout au groupe:', error);
//         alert('Une erreur est survenue lors de l\'ajout au groupe.');
//       }
//     );
//   }

  
// }










import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { CommonModule } from '@angular/common';
import { User } from '../../../auth/models/user';
import { GroupModel } from '../../models/group.model';
import { AuthService } from '../../../auth/service/auth.service';
import { GroupService } from '../../services/group.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './group-blog-list.component.html',
  styleUrls: ['./group-blog-list.component.scss']
})
export class GroupBlogListComponent implements OnInit{

  groupId!: any;
  sharedBlogs: Blog[] = [];
  group!: GroupModel;
  currentUser!: User;
  userBlogs: Blog[] = []; // Liste des blogs de l'utilisateur pour le partage
  selectedBlogId!: number; // ID du blog sélectionné pour le partage

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private groupService: GroupService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const groupIdParam = this.route.snapshot.paramMap.get('id');
    if (groupIdParam) {
        this.groupId = +groupIdParam;
        this.loadGroup(this.groupId);
        this.loadSharedBlogs();
        
        this.authService.currentUser$.subscribe((user) => {
          if (user) {
            this.currentUser = user;
            this.loadUserBlogs();
          }
        });
    } else {
        console.error('ID de groupe manquant dans l\'URL.');
        alert('Une erreur est survenue : ID de groupe manquant.');
    }
  }

  // Charger les blogs partagés dans le groupe
  loadSharedBlogs(): void {
    this.http.get<any[]>(`http://localhost:3000/groupShares?groupId=${this.groupId}`).subscribe(
      (shares) => {
        const blogIds = shares.map((share) => share.blogId);
        this.fetchBlogs(blogIds);
      },
      (error) => console.error('Erreur lors du chargement des blogs partagés:', error)
    );
  }

  // Récupérer les détails des blogs partagés
  fetchBlogs(blogIds: number[]): void {
    if (blogIds.length > 0) {
      this.http.get<Blog[]>(`http://localhost:3000/blogs?id=${blogIds.join('&id=')}`).subscribe(
        (blogs) => (this.sharedBlogs = blogs),
        (error) => console.error('Erreur lors du chargement des blogs:', error)
      );
    }
  }

  // Charger les informations du groupe
  loadGroup(groupId: string): void {
    this.groupService.getGroupById(groupId).subscribe(
      (group) => (this.group = group),
      (error) => console.error('Erreur lors du chargement du groupe:', error)
    );
  }

  // Charger les blogs de l'utilisateur
  loadUserBlogs(): void {
    this.http.get<Blog[]>(`http://localhost:3000/blogs?authorId=${this.currentUser.id}`).subscribe(
      (blogs) => (this.userBlogs = blogs),
      (error) => console.error('Erreur lors du chargement des blogs de l\'utilisateur:', error)
    );
  }

  // Rejoindre le groupe
  joinGroup(): void {
    if (!this.currentUser) return;

    if (this.group.members.some(member => member.id === this.currentUser.id)) {
      alert('Vous êtes déjà membre de ce groupe.');
      return;
    }

    this.groupService.joinGroup(this.group.id!, this.currentUser).subscribe(
      (updatedGroup) => {
        this.group = updatedGroup;
        alert('Vous avez rejoint le groupe avec succès !');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout au groupe:', error);
        alert('Une erreur est survenue lors de l\'ajout au groupe.');
      }
    );
  }

  // Partager un blog dans le groupe
  shareBlog(): void {
    if (!this.selectedBlogId || !this.currentUser) return;

    const shareData = {
      groupId: this.groupId,
      blogId: this.selectedBlogId,
      userId: this.currentUser.id
    };

    this.http.post(`http://localhost:3000/groupShares`, shareData).subscribe(
      () => {
        alert('Blog partagé avec succès dans le groupe.');
        this.loadSharedBlogs(); // Recharge les blogs partagés
      },
      (error) => {
        console.error('Erreur lors du partage dans le groupe:', error);
        alert('Une erreur est survenue lors du partage du blog.');
      }
    );
  }
}
