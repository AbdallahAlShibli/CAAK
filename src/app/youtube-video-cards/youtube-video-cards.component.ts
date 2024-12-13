import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-youtube-video-cards',
  templateUrl: './youtube-video-cards.component.html',
  styleUrls: ['./youtube-video-cards.component.css']
})
export class YoutubeVideoCardsComponent implements OnInit {
  title = 'Learning Videos';

  // List of YouTube videos
  videos = [
    { id: '89eCHtFs0XM', title: 'Internet Safety for Kids K-3' },
    { id: 'X_duZ-1LApg', title: 'Pause & Think Online' },
    { id: 'tiUYMcPAI84', title: 'What is a digital footprint' },
    { id: 'X9Htg8V3eik', title: '5 Internet Safety Tips for Kids' }
  ];

  // Tracks the current video being played
  selectedVideoId: string | null = null;
  player: any = null; // YouTube Player instance

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Dynamically load the YouTube Iframe API script
    const script = this.renderer.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    this.renderer.appendChild(document.body, script);

    // Define the global onYouTubeIframeAPIReady function
    (window as any).onYouTubeIframeAPIReady = () => {
      console.log('YouTube Iframe API is ready');
    };
  }

  // Play the selected video
  playVideo(videoId: string): void {
    this.selectedVideoId = videoId;

    // Initialize or load the player
    setTimeout(() => {
      if (!this.player) {
        this.player = new (window as any).YT.Player('youtube-player', {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1, // Ensure autoplay works
            rel: 0,
            showinfo: 0
          },
          events: {
            onReady: (event: any) => event.target.playVideo()
          }
        });
      } else {
        this.player.loadVideoById(videoId);
        this.player.playVideo();
      }
    }, 100); // Slight delay to ensure the DOM is ready
  }

  // Close the player and stop the video
  closePlayer(): void {
    if (this.player) {
      this.player.stopVideo();
      this.player.destroy(); // Destroy the player instance
      this.player = null;
    }
    // this.selectedVideoId = null;
    this.selectedVideoId = '';
  }
}