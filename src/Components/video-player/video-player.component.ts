import { Component, input, Input } from '@angular/core';
import { VideoLessonListModel } from '../../Models/VideoLessonsModels';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  // @Input() videoIdFromVideoLessons: VideoLessonListModel[]= [];

videoIdFromVideoLessons = input<VideoLessonListModel>();
constructor() {
  // this.videoIdFromVideoLessons = {
  //   id: '',
  //   title: '',
  //   description: '',
  //   videoPath: ''
  // };
}

}
