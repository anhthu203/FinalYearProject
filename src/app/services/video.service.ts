import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  constructor(private WebRequestService: WebRequestService) {}

  getVideos(){
    return this.WebRequestService.get(`videos`);
  }
}
