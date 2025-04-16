const songs = [
  { id: 1, title: "Jaja na twardo", author: "rów babicze", url: "songs/nuta1.mp3" },
  { id: 2, title: "RysunKOwY PoTwóR", author: "chivas", url: "songs/nuta2.mp3" },
  { id: 3, title: "Hej czy ty wiesz", author: "Dawid Jasper", url: "songs/nuta3.mp3" },
  { id: 4, title: "Zwariowana noc", author: "Dawid Jasper", url: "songs/nuta4.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;
let currentVolume = 100;
let isPlayerOpen = false;
const audio = new Audio(songs[currentSongIndex].url);
audio.volume = currentVolume / 100;

const rangeSlide = (value) => {
  const volume = value / 100;
  audio.volume = volume;
  currentVolume = parseInt(value);
  document.querySelector('.rangeValue').innerText = value + "%";
  document.querySelector('.range').value = value;
};

const loadSong = (index) => {
  const song = songs[index];
  const html = `
    <p>${song.title}</p>
    <p>${song.author}</p>
  `;

  document.querySelector('.song-info').innerHTML = html;

  audio.src = song.url;
  isPlaying = false;
  updatePlayPauseIcon();
};

const nextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
};

const prevSong = () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
};

const toggleSongPause = () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  updatePlayPauseIcon();
};

const updatePlayPauseIcon = () => {
  const icon = document.getElementById('playPauseIcon');
  icon.className = isPlaying ? "ri-pause-line" : "ri-play-line";
};

// Rozwijanie music-box
const musicBox = document.querySelector('.music-box');

musicBox.addEventListener('click', () => {
  isPlayerOpen = !isPlayerOpen;
  musicBox.classList.toggle('expanded', isPlayerOpen);

  if (isPlayerOpen) {
    const html = `
      <div class="song-info">
        <p>${songs[currentSongIndex].title}</p>
        <p>${songs[currentSongIndex].author}</p>
      </div>
      <input type="range" class="range" min="0" max="100" value="${currentVolume}" onchange="rangeSlide(this.value)" />
      <span class="rangeValue">${currentVolume}%</span>
      <div class="music-controls">
        <button onclick="prevSong()">⏮</button>
        <button onclick="toggleSongPause()"><i id="playPauseIcon" class="ri-play-line"></i></button>
        <button onclick="nextSong()">⏭</button>
      </div>
    `;
    musicBox.innerHTML = html;
    updatePlayPauseIcon();
  } else {
    musicBox.innerHTML = `<i class="ri-spotify-line"></i><div class="song-info"></div>`;
  }
});

window.onload = () => {
  loadSong(currentSongIndex);
  rangeSlide(currentVolume);
};