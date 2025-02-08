import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupShareService {
//   private apiUrl = 'http://localhost:3000/groups';
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

//   shareBlogToGroup(blogId: string, groupId: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/${groupId}/sharedBlogs`, { blogId });
//   }

//   getGroups(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

shareBlogToGroup(blogId: string, groupId: number): Observable<any> {
    // Utilise `groupShares` pour enregistrer le partage avec blogId et groupId
    return this.http.post(`${this.apiUrl}/groupShares`, { blogId, groupId });
  }

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groups`);
  }
}
