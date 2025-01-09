import { useState, useEffect } from 'react';

function Podcast({ data }) {
  const [audioDuration, setAudioDuration] = useState('');
  const [currentAudioDur, setCurrentAudioDur] = useState('');
  // Possible improvements:
  // - Change timeline and volume slider into input sliders, reskinned
  // - Change into Vue or React component
  // - Be able to grab a custom title instead of "Music Song"
  // - Hover over sliders to see preview of timestamp/volume change
  //https://codepen.io/EmNudge/embed/rRbLJQ?default-tab=js%2Cresult&theme-id=light

  useEffect(() => {
    const audioPlayer = document.querySelector('.audio-player');
    let playsrc = document.querySelector('.prodcastbox .playsrc').dataset.src;
    //console.log(playsrc);
    const audio = new Audio(
      //"music_2.mp3"
      playsrc
    );
    //credit for song: Adrian kreativaweb@gmail.com

    audio.addEventListener(
      'loadeddata',
      () => {
        // audioPlayer.querySelector('.time .length').textContent =
        //   getTimeCodeFromNum(audio.duration);
        // document.querySelector('.prodminfo .prodtime span').textContent =
        //   getTimeCodeFromNum(audio.duration);
        setAudioDuration(getTimeCodeFromNum(audio.duration));
        audio.volume = 0.75;
      },
      false
    );

    //click on timeline to skip around
    const timeline = audioPlayer.querySelector('.timeline');
    timeline.addEventListener(
      'click',
      (e) => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
      },
      false
    );

    //click volume slider to change volume
    const volumeSlider = audioPlayer.querySelector('.controls .volume-slider');
    volumeSlider.addEventListener(
      'click',
      (e) => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        audioPlayer.querySelector('.controls .volume-percentage').style.width = newVolume * 100 + '%';
      },
      false
    );

    //check audio percentage and update time accordingly
    setInterval(() => {
      const progressBar = audioPlayer.querySelector('.progress');
      progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
      //   audioPlayer.querySelector('.time .current').textContent =
      //     getTimeCodeFromNum(audio.currentTime);
      setCurrentAudioDur(getTimeCodeFromNum(audio.currentTime));
    }, 500);

    //toggle between playing and pausing on button click
    const playBtn = audioPlayer.querySelector('.controls .toggle-play');
    playBtn.addEventListener(
      'click',
      () => {
        if (audio.paused) {
          playBtn.classList.remove('play');
          playBtn.classList.add('pause');
          playBtn.closest('.audioplayer').classList.remove('pauseing');
          playBtn.closest('.audioplayer').classList.add('playing');
          audio.play();
        } else {
          playBtn.classList.remove('pause');
          playBtn.classList.add('play');
          playBtn.closest('.audioplayer').classList.remove('playing');
          playBtn.closest('.audioplayer').classList.add('pauseing');
          audio.pause();
        }
      },
      false
    );

    audioPlayer.querySelector('.volume-button').addEventListener('click', () => {
      const volumeEl = audioPlayer.querySelector('.volume-container .volume');
      audio.muted = !audio.muted;
      if (audio.muted) {
        volumeEl.classList.remove('icono-volumeMedium');
        volumeEl.classList.add('icono-volumeMute');
      } else {
        volumeEl.classList.add('icono-volumeMedium');
        volumeEl.classList.remove('icono-volumeMute');
      }
    });

    //turn 128 seconds into 2:08
    function getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0) return minutes + 'm ' + String(seconds % 60).padStart(1, 0) + 's';
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }
  }, []);
  return (
    <div className="audioplayer">
      {data &&
        data.map((item, id) => {
          return (
            <div className="prodcastbox df fww" key={id}>
              <div className="top_txt">
                <h5>
                  Podcast <i className="far fa-angle-right"></i>
                </h5>
              </div>
              <div className="playsrc" data-src={item.audio}></div>
              <div className="prodmedia">
                <figure className="pvr">
                  <img className="playingboxanim" src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/playinganim.gif'} alt="" />
                  <img src={item.image_for_audio} alt="" className="objctimg_box" />
                </figure>
              </div>
              <div className="prodminfo">
                <h5 dangerouslySetInnerHTML={{ __html: item.title }}></h5>
                <p>{item.podcast_date}</p>
                <p className="prodtime">
                  <span>{audioDuration}</span>
                </p>
              </div>
              <div className="audio-player prodaudioplay">
                <div className="controls">
                  <div className="time">
                    <div className="current">{currentAudioDur}</div>
                    <div className="length">{audioDuration}</div>
                  </div>
                  <div className="play-container">
                    <div className="toggle-play play"></div>
                  </div>

                  <div className="volume-container">
                    <div className="volume-button">
                      <div className="volume icono-volumeMedium"></div>
                    </div>
                    <div className="volume-slider">
                      <div className="volume-percentage"></div>
                    </div>
                  </div>
                </div>
                <div className="timeline">
                  <div className="progress"></div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Podcast;
