
const songs = [
  {title: "On The Flip", artist: "The Grey Room", src: "songs/On The Flip - The Grey Room _ Density & Time.mp3", fav: false},
  {title: "By Myself", artist: "The Grey Room", src: "songs/By Myself - The Grey Room _ Clark Sims.mp3", fav: false},
  {title: "Resolution Or Reflection", artist: "The Grey Room", src: "songs/Resolution Or Reflection - The Grey Room _ Clark Sims.mp3", fav: false},
  {title: "Claim To Fame", artist: "The Grey Room", src: "songs/Claim To Fame - The Grey Room _ Clark Sims.mp3", fav: false},
  {title: "Down The Rabbit Hole", artist: "The Grey Room", src: "songs/Down The Rabbit Hole - The Grey Room _ Density & Time.mp3", fav: false},
];

let currentTab = 'all';
let currentSongIndex = null;
const audio = new Audio();

const songList = document.getElementById('song-list');
const currentSongDiv = document.getElementById('current-song');
const playPauseBtn = document.getElementById('play-pause');

function render() {
  songList.innerHTML = '';
  const list = currentTab === 'all' ? songs : songs.filter(s => s.fav);
  list.forEach((song, index) => {
    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      <span>${song.title} – ${song.artist}</span>
      <span class="favorite">${song.fav ? '★' : '☆'}</span>
    `;
    div.querySelector('.favorite').addEventListener('click', (e)=>{
      e.stopPropagation();
      song.fav = !song.fav;
      render();
    });
    div.addEventListener('click', ()=>{
      playSong(songs.indexOf(song));
    });
    songList.appendChild(div);
  });
}

function playSong(index){
  currentSongIndex = index;
  audio.src = songs[index].src;
  audio.play();
  currentSongDiv.textContent = `${songs[index].title} – ${songs[index].artist}`;
  playPauseBtn.textContent = '⏸️';
}

playPauseBtn.addEventListener('click', ()=>{
  if(!audio.src) return;
  if(audio.paused){
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

document.getElementById('tab-all').addEventListener('click', ()=>{
  currentTab = 'all';
  document.getElementById('tab-all').classList.add('active');
  document.getElementById('tab-fav').classList.remove('active');
  render();
});

document.getElementById('tab-fav').addEventListener('click', ()=>{
  currentTab = 'fav';
  document.getElementById('tab-fav').classList.add('active');
  document.getElementById('tab-all').classList.remove('active');
  render();
});

render();

