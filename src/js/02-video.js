// This script does the following:
// - Saves the current time of a Vimeo video player to local storage every 1000 milliseconds
// - Sets the current time of the video player to the saved time on page load

import Vimeo from '@vimeo/player';
import { throttle } from 'lodash';

const playerElement = document.getElementById('vimeo-player');
const player = new Vimeo(playerElement);

player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(currentTime => {
      localStorage.setItem('videoplayer-current-time', currentTime);
    });
  }, 1000)
);

const savedTime = localStorage.getItem('videoplayer-current-time');
savedTime === null
  ? player.setCurrentTime(0)
  : player.setCurrentTime(savedTime);
