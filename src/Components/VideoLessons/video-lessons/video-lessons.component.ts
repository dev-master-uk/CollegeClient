import { Component, Input, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { VideolessonsService } from '../../../Services/VideoLessons/videolessons.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoPlayerComponent } from '../../video-player/video-player.component';
import { VideoLessonListModel } from '../../../Models/VideoLessonsModels';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-lessons',
  standalone: true,
  imports: [    
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,ReactiveFormsModule,FormsModule],
  templateUrl: './video-lessons.component.html',
  styleUrl: './video-lessons.component.css'
})

export class VideoLessonsComponent implements OnInit {

  @Input() videoFromexport: VideoLessonListModel | undefined;
  videoLessons?: VideoLessonListModel[];
  videoLesson: VideoLessonListModel | undefined;
  constructor(private videoLessonsService: VideolessonsService,private router: Router
  ) { }
  ngOnInit(): void {
    this.videoLessonsService.getVideoLessons().subscribe({
      next: (response) => {
        this.videoLessons = response as VideoLessonListModel[];
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      }
  

    });
  }
playVideo(id: string) {  
 
  // Refresh the list of video lessons
  this.videoLessonsService.getVideoLessonById(id).subscribe({
    next: (response) => {
      this.videoLesson = response as VideoLessonListModel;
      console.log(response);
     
      
    },
    error: (err) => {
      console.error(err);
    }
  
  }); 
}
getVideoLessonByClassId(classId: string) {
  this.videoLessonsService.getVideoLessonsByClassId(classId).subscribe({
    next: (response) => {
      this.videoLessons = response as VideoLessonListModel[];
      console.log(response);
    },
    error: (err) => {
      console.error(err);
    }
  });
}
reloadComponent() {
let currenturl= this.router.url;
this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([currenturl]));
}

}

