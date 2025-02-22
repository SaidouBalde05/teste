import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
// import { NgxEditorModule } from '@kolkov/ngx-editor';
import { NgxEditorModule } from 'ngx-editor';
import { BlogEditorComponent } from './component/blog-editor/blog-editor.component';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogDetailComponent } from './component/blog-detail/blog-detail.component';
import { BlogDraftEditorComponent } from './component/blog-draft-editor/blog-draft-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from './services/safe-html.pipe';
import { QuillModule } from 'ngx-quill';
import { MatToolbar } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    BlogEditorComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogDraftEditorComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule, 
    RouterLink,
    NgxEditorModule,
    QuillModule.forRoot(),
    MatToolbar
  ]
})
export class BlogModule { }
