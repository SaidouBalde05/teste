import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ShortenPipe } from './pipe/shorten.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipe/timeAgo.pipe';
import { UsernamePipe } from './pipe/username.pipe';

@NgModule({
  declarations: [
    ShortenPipe,
    // UsernamePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CommentsComponent,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ShortenPipe,
    // UsernamePipe,
    TimeAgoPipe,
    HighlightDirective,
    ReactiveFormsModule
  ]
})
export class SharedModule { }