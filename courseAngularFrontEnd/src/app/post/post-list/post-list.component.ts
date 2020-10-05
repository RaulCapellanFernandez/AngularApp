import { Component, OnDestroy, OnInit } from '@angular/core';
import {Post} from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
 /* posts = [
    {title: 'First post', content: 'Contenido del post'},
    {title: 'Second post', content: 'Contenido del post'},
    {title: 'Third post', content: 'Contenido del post'}
  ]*/
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postsService: PostService){}

  ngOnInit(){
    this.posts = this.postsService.getPost();
    this.postSub=this.postsService.getPostUpdateListenner()
    .subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
