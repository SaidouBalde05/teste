import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImageHoverService } from '../../../image-hover.service';
import { GroupShareService } from '../../services/group-share.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: any; 
  sanitizedContent!: SafeHtml;
  currentChapterIndex: number = 0; 
  groups: any[] = [];
  selectedGroupId: any | null = null;
  shareSuccessMessage: any | null = null;

  @ViewChild('chapterTitle', { static: false }) chapterTitle!: ElementRef; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    public sanitizer: DomSanitizer,
    private imageHoverService: ImageHoverService,
    private groupShareService: GroupShareService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.loadBlogDetails(blogId);
    };
    this.loadGroups();
  }

  loadBlogDetails(id: string) {
    this.http.get(`http://localhost:3000/blogs/${id}`).subscribe(
      (data) => {
        this.blog = data;
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content); 
      },
      (error) => console.error('Erreur lors du chargement du blog:', error)
    );
  }

  previousChapter() {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
      this.scrollToChapter();
    }
  }

  nextChapter() {
    if (this.currentChapterIndex < (this.blog.chapters.length - 1)) {
      this.currentChapterIndex++;
      this.scrollToChapter();
    }
  }

  scrollToChapter() {
    if (this.chapterTitle) {
      this.chapterTitle.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      this.imageHoverService.enlargeImage(target);
    }
  }

  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; 
    if (target) {
      this.imageHoverService.resetImage(target);
    }
  }

  loadGroups() {
    this.groupShareService.getGroups().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => console.error('Erreur lors du chargement des groupes:', error)
    );
  }

  shareToGroup() {
    if (this.selectedGroupId && this.blog.id) {
      this.groupShareService.shareBlogToGroup(this.blog.id, this.selectedGroupId).subscribe(
        () => {
          this.shareSuccessMessage = 'Le blog a été partagé avec succès dans le groupe !';
        },
        (error) => {
          console.error('Erreur lors du partage dans le groupe:', error);
          this.shareSuccessMessage = 'Erreur lors du partage dans le groupe. Veuillez réessayer plus tard.';
        }
      );
    }
  }
  

  goBack() {
    this.location.back();
  }
}