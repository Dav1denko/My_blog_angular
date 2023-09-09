import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/posts.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  pSub:Subscription
  searchStr = ''

  constructor(private postService: PostService){}
  
ngOnInit() {
  this.pSub = this.postService.getAll().subscribe(posts =>{
this.posts = posts
  })
}
ngOnDestroy() {
  if(this.pSub){
    this.pSub.unsubscribe()
  }
}
remove(id?: string){}


}
