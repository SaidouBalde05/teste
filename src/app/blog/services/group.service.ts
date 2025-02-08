// group.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3000/groups';
  group: any;

  constructor(private http: HttpClient) {}

  createGroup(group: GroupModel): Observable<GroupModel> {
    return this.http.post<GroupModel>(this.apiUrl, group);
  }

  getGroups(): Observable<GroupModel[]> {
    return this.http.get<GroupModel[]>(this.apiUrl);
  }

  // Méthode pour obtenir les détails du groupe
  getGroupById(groupId: any): Observable<GroupModel> {
    return this.http.get<GroupModel>(`${this.apiUrl}/${groupId}`);
  }

  // Méthode pour rejoindre un groupe
  joinGroup(groupId: any, user: User): Observable<GroupModel> {
    return this.http.patch<GroupModel>(`${this.apiUrl}/${groupId}`, {
      members: [...this.group.members, user]  // Ajoute l'utilisateur au tableau des membres
    });
  }

}
