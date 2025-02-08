import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GroupModel } from '../../models/group.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent implements OnInit{

  groups: GroupModel[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur de chargement des groupes:', error);
        this.errorMessage = "Impossible de charger les groupes.";
        this.loading = false;
      }
    });
  }

}
