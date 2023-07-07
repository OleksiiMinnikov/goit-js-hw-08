import Player from '@vimeo/player';
// console.log(Player);

import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const storageKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime() {
  player.getCurrentTime().then((seconds) => {
    localStorage.setItem(storageKey, seconds);
  });
}

const savedTime = localStorage.getItem(storageKey);
if (savedTime) {
  player.setCurrentTime(savedTime);
}
