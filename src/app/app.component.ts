import { Component } from '@angular/core';
import { VideoService } from './services/video.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private VideoService: VideoService) {}

  videos: any;
  
  ngOnInit(): void {
    this.VideoService.getVideos().subscribe((videos: any) => {
      this.videos = videos;   
    })
  }
}
