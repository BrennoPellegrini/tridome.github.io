/*--- variabili ---*/

var scene = document.querySelector('a-scene');
var sky = document.querySelector('a-sky');
var sound = document.getElementById('bg-sound');
var cursore = document.getElementById('cursore');
var link = document.getElementById('link');
var videoContainer = document.getElementById('wide-screen');
var videoInstruction = document.getElementById('video-instruction');
var videoControls = document.getElementById('flat-screen-video-controls');
var sphereVideoControls = document.getElementById('sphere-screen-video-controls');
var contentContainer = document.getElementById('content');
var wideScreenSetUp = document.getElementById('wide-video-screen');
var button = document.getElementById('screen-button');
var hideButton = document.getElementById('hide-button');
var video1 = document.querySelector(".video1");
var video2 = document.querySelector(".video2");
var videoPlaceholder = document.getElementById('videoPlaceholder');
var screenBlocker = document.querySelector(".close-eyes");

/*--- Al caricamento ---*/

    /// Nascondo full-screen e pulsante controlli
    wideScreenSetUp.setAttribute("visible", false);
    button.setAttribute("visible", false);
    hideButton.setAttribute("visible", false);

    /// Faccio partire l'audio di sottofondo
    scene.addEventListener('loaded', function() {
        screenBlocker.style.display = "none";
        sound.components.sound.playSound();
    });

    /// Per iphone --- Safari
    scene.addEventListener('enter-vr', function() {
        window.scrollTop = 0;
    });

/*--- Link spostamento ---*/

    /// Ritorno home
    link.addEventListener('click', function () {
        window.location.href = '../';
    });

/*--- Componenti video ---*/

    /// Cambia video
    function changeVideo(t) {
      sound.components.sound.stopSound();
      videoContainer.removeAttribute("color");
      videoInstruction.innerHTML = "";
      videoContainer.setAttribute('src', "#" + t.className.substring(0, 6));
      videoControls.innerHTML = `<a-entity class="clickable" video-controls="src:#${t.className.substring(0, 6)};"></a-entity>`;
      sphereVideoControls.innerHTML = `<a-entity video-controls="src:#${t.className.substring(0, 6)}"></a-entity>`;
      button.setAttribute("visible", true);
    }

    /// Passaggio visuale video

    function setVideoSize() {
      if(wideScreenSetUp.getAttribute("visible") == false) {
        var src = videoContainer.getAttribute("src");
        /// aggiungo e rimuovo la classe clickable per fare si che il cursore faccia quello che deve
        link.classList.remove("clickable");
        video1.classList.remove("clickable");
        video2.classList.remove("clickable");
        contentContainer.setAttribute('visible', false);
        button.setAttribute('src', '#smallScreenIcon');
        wideScreenSetUp.setAttribute('visible', true);
        hideButton.setAttribute("visible", true);
        hideButton.classList.add("clickable");
        sky.setAttribute('src', src);
      } else {
        link.classList.add("clickable");
        video1.classList.add("clickable");
        video2.classList.add("clickable");
        button.classList.add("clickable");
        hideButton.classList.remove("clickable");
        button.setAttribute('src', '#wideScreenIcon');
        cursore.setAttribute("cursor", "fuse: true; fuseTimeout: 1400");
        contentContainer.setAttribute("visible", true);
        wideScreenSetUp.setAttribute("visible", false);
        hideButton.setAttribute("visible", false);
        sky.setAttribute("src", "#bg");
        sky.classList.remove("clickable");
      }
    }

    /// Nascondi rendi visibile in full screen

    function hideControls() {
      cursore.setAttribute("cursor", "fuse: false; fuseTimeout: 1400");
      videoPlaceholder.classList.add("clickable");
      hideButton.classList.remove("clickable");
      sphereVideoControls.classList.remove("clickable");
      sphereVideoControls.setAttribute('visible', false);
      button.setAttribute("visible", false);
      hideButton.setAttribute("visible", false);
    }

    videoPlaceholder.addEventListener("click", function(){
      cursore.setAttribute("cursor", "fuse: true; fuseTimeout: 1400");
      videoPlaceholder.classList.remove("clickable");
      sphereVideoControls.setAttribute('visible', true);
      button.setAttribute("visible", true);
      hideButton.setAttribute("visible", true);
      hideButton.classList.add("clickable");
      sphereVideoControls.classList.add("clickable");
    })
