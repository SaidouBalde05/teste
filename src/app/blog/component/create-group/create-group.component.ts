import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { User } from '../../../auth/models/user';
import { GroupModel } from '../../models/group.model';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent implements OnInit{

  groupForm: FormGroup;
  users: User[] = [];
  createdGroup: GroupModel | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private groupService: GroupService
  ) {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      admins: [[], Validators.required],
      members: [[]]
    });
  }

  ngOnInit(): void {
    // Récupérer les utilisateurs pour sélectionner les membres et admins
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  createGroup(): void {
    if (this.groupForm.valid) {
      const formValues = this.groupForm.value;
      const newGroup: GroupModel = {
        name: formValues.name,
        description: formValues.description,
        createdAt: new Date().toISOString(),
        admins: formValues.admins,
        members: formValues.members,
        sharedBlogs: []
      };

      this.groupService.createGroup(newGroup).subscribe((group) => {
        this.createdGroup = group;
        this.groupForm.reset();
        console.log('Group created:', group);
      });
    }
  }

}
