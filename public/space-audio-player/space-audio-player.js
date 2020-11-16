import './lib/webaudio-controls.js';

const template = document.createElement("template");
template.innerHTML = `
  <style>
    #container {
        width: 1000px;
        display: flex;
        flex-direction: column;
        background-repeat: repeat;
        font-family: mandalore;
	font-size: 20px;
        border-radius: 1rem;
	color: #b90606;
        box-shadow: 1rem 0.5rem 0.5rem black;
        padding: 1rem;
        -webkit-text-stroke: 0.06rem black;
    }
    
    #header-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    
    #grid, #canvas {
        border: 0.5rem solid black;
        border-radius: 1rem;
    }
    
    #timeline {
        height: 0.3rem;
        vertical-align: middle;
        background: black;
    }
    
    #timeline::-moz-progress-bar
    {
        background: red;
    }
    #timeline::-webkit-progress-bar
    {
        background: transparent;
    }
    #timeline::-webkit-progress-value
    {
        background: red;
    }
    
    .sub-container {
        display: flex;
        justify-content: center;
        margin-top: 0.5rem;
    }
    
    #button-container {
        margin-bottom: 0.5rem;
    }
    
    #middle-container {
        align-items: center;
    }
    
    #middle-container > * {
        margin: 1rem;
    }
    
    #volume-container, #panner-container, #frequencies-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -1rem;
    }
    
    #volume-container {
        margin-top: -0.7rem;
    }
    
    #frequencies-container {
        margin-top: -1.3rem;
    }
    
    #panner-label {
        margin-top: -1rem;
        margin-bottom: 1rem;
    }
    
    #frequencies-label {
        margin-bottom: 0.3rem;
    }

    #eq-container {
        justify-content: center;
    }
    
    .eq {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 1rem;
    }
    
    button {
        background-color: black;
        padding: 0.5rem;
        margin: 0 0.3rem;
        border-radius: 0.3rem
    }
    
    output, #current-time, #duration {
        display: inline-block;
        text-align: center;
        width: 3rem;
    }
    
    #current-time, #duration {
        width: 5rem;
    }
  </style>
  <div id="container">
      <div id="header-container">
        <canvas id="canvas" height="200px" width="250px"></canvas>
        <img id="grid" src="assets/img/grid.gif" width="500px" height="200px" alt="red grid picture">
        <webaudio-knob src="assets/sprites/meter.png" id="meter" min="0" max="150" step="10"></webaudio-knob>
      </div>
      <div class="sub-container">
          <audio id="audio" crossorigin="anonymous">
            <source src="assets/audio/sample.mp3" type="audio/mp3"/>
          />
            Your browser does not support the HTML5 audio element.
          </audio>
          <div>
              <span id="current-time"></span>
              <progress id="timeline" value="0" max="1"></progress>
              <span id="duration"></span>
          </div>
      </div>
      <div id="button-container" class="sub-container">
          <button id="playPause"><img src="assets/buttons/play.png" alt="play icon"></button>
          <button id="restart"><img src="assets/buttons/restart.png" alt="restart icon"></button>
          <button id="rewind"><img src="assets/buttons/rewind.png" alt="rewind icon"></button>
          <button id="skip"><img src="assets/buttons/skip.png" alt="skip icon"></button>
          <button id="loop"><img src="assets/buttons/loop-off.png" alt="loop off icon"></button>
      </div>
      <div id="middle-container" class="sub-container">
          <div id="volume-container">
            <label id="volume-label" for="gain">Volume</label>
            <webaudio-knob src="assets/sprites/knob-sprite.png" id="gain" min="0" max="1" step="0.01" value="0.5"></webaudio-knob>  
          </div>
          <div id="panner-container">
              <label id="panner-label" for="panner">Balance</label>
              <webaudio-slider min="-1" max="1" step="0.1" value="0" id="panner" src="assets/sprites/hslider-body.png" knobsrc="assets/sprites/hslider-knob.png"></webaudio-slider>
          </div>
          <div id="frequencies-container">
            <label id="frequencies-label" for="switch">Frequencies</label>
            <webaudio-switch id="switch" src="assets/sprites/switch.png" diameter="50"></webaudio-switch>   
          </div>        
      </div>
      <div id="eq-container" class="sub-container">
          <div class="eq">
            <label>60Hz</label>
            <webaudio-slider value="0" step="1" min="-30" max="30" id="eq-0" direction="vert" src="assets/sprites/vslider-body.png" knobsrc="assets/sprites/vslider-knob.png"></webaudio-slider>
          <output id="eq0">0 dB</output>
          </div>
          <div class="eq">
            <label>170Hz</label>
            <webaudio-slider value="0" step="1" min="-30" max="30" id="eq-1" direction="vert" src="assets/sprites/vslider-body.png" knobsrc="assets/sprites/vslider-knob.png"></webaudio-slider>
            <output id="eq1">0 dB</output>
          </div>
          <div class="eq">
            <label>350Hz</label>
            <webaudio-slider value="0" step="1" min="-30" max="30" id="eq-2" direction="vert" src="assets/sprites/vslider-body.png" knobsrc="assets/sprites/vslider-knob.png"></webaudio-slider>
            <output id="eq2">0 dB</output>
          </div>
          <div class="eq">
            <label>1000Hz</label>
            <webaudio-slider value="0" step="1" min="-30" max="30" id="eq-3" direction="vert" src="assets/sprites/vslider-body.png" knobsrc="assets/sprites/vslider-knob.png"></webaudio-slider>
            <output id="eq3">0 dB</output>
          </div>
          <div class="eq">
            <label>3500Hz</label>
            <webaudio-slider value="0" step="1" min="-30" max="30" id="eq-4" direction="vert" src="assets/sprites/vslider-body.png" knobsrc="assets/sprites/vslider-knob.png"></webaudio-slider>
            <output id="eq4">0 dB</output>
          </div>
          <div class="eq">
            <label>10000Hz</label>
            <webaudio-slider value="0" step="1" min="-30" max="30" id="eq-5" direction="vert" src="assets/sprites/vslider-body.png" knobsrc="assets/sprites/vslider-knob.png"></webaudio-slider>
            <output id="eq5">0 dB</output>
          </div>
      </div>
<!--      <div class="controls">-->
<!--        <label for="convolverSlider">Reverberation (Dry/Wet)</label>-->
<!--        <input type="range" min="0" max="1" step="0.1" value="0" id="convolver" />-->
<!--      </div>-->
  </div>`;

class SpaceAudioPlayer extends HTMLElement {
    constructor() {
        super();
        this.basePath = new URL('.', import.meta.url);
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.loadImpulse(this.basePath +'assets/audio/impulse.wav', this.buildNodes.bind(this));
        this.attachShadow({ mode: "open" });
        this.addFontFaceInHostCSS();
    }

    /*
     * Fix the images' relative path issue in the template, prior to adding it to the shadow dom.
     */
    async fixImageRelativePaths(templateContent) {
        /* set background image */
        const container = templateContent.querySelector('#container');
        container.style.backgroundImage = 'url("' + this.basePath + 'assets/backgrounds/spaceship-texture.jpg")';

        /* Fix relative paths in the template's content */
        const srcElements = templateContent.querySelectorAll('webaudio-knob, webaudio-switch, webaudio-slider, img, source');
        srcElements.forEach((e) => {
            const currentImagePath = e.getAttribute('src');
            if (currentImagePath) {
                e.setAttribute('src', this.basePath + currentImagePath);
            }
        });

        const sliders = templateContent.querySelectorAll('webaudio-slider');
        sliders.forEach((e) => {
            let currentImagePath = e.getAttribute('knobsrc');
            if (currentImagePath) {
                e.setAttribute('knobsrc', this.basePath + currentImagePath);
            }
        });
    }

    addFontFaceInHostCSS() {
        let hostStyle = document.querySelector('style');
        if (!hostStyle) {
            hostStyle = document.createElement('style');
        }
        const fontUrl = 'url("' + this.basePath + 'assets/font/mandalore.otf")';
        hostStyle.prepend(document.createTextNode('\
            @font-face {\
            font-family: mandalore;\
            src:' + fontUrl + ';\
            format: ("opentype");\
        }'));
    }

    connectedCallback() {
        const templateContent = template.content;
        this.fixImageRelativePaths(templateContent);
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        // Audio
        this.audio = this.shadowRoot.getElementById('audio');
        this.audio.onplay = () => this.audioContext.resume();

        // Controllers
        this.shadowRoot.getElementById('audio').ontimeupdate = () => this.setProgressBar();
        this.shadowRoot.getElementById('playPause').onclick = () => this.playPause();
        this.shadowRoot.getElementById('restart').onclick = () => this.restart();
        this.shadowRoot.getElementById('skip').onclick = () => this.skip(10);
        this.shadowRoot.getElementById('rewind').onclick = () => this.rewind(10);
        this.shadowRoot.getElementById('loop').onclick = () => this.toggleLoop();
        this.shadowRoot.getElementById('gain').oninput = (evt) => this.gainNode.gain.value = evt.target.value;
        this.shadowRoot.getElementById('panner').oninput = (evt) => this.pannerNode.pan.value = evt.target.value;
        this.shadowRoot.getElementById('switch').onchange = (evt) => this.displayFrequencies = evt.target.value;
        // this.shadowRoot.getElementById("convolver").oninput = (evt) => {
        //     this.convolverGain.gain.value = parseFloat(evt.target.value);
        //     this.directGain.gain.value = 1 - this.convolverGain.gain.value;
        // };
        for(let i = 0; i < 6; i++) {
            this.shadowRoot.getElementById("eq-" + i).oninput = (evt) => this.changeEq(evt.target.value, i);
        }
    }

    buildNodes() {
        this.gainNode = this.audioContext.createGain();
        this.pannerNode = this.audioContext.createStereoPanner();
        this.equalizers = this.createEqualizers();
        // this.convolverNode = this.audioContext.createConvolver();
        // this.convolverNode.buffer = this.decodedImpulse;
        // this.convolverGain = this.audioContext.createGain();
        // this.convolverGain.gain.value = 0;
        // this.directGain = this.audioContext.createGain();
        // this.directGain.gain.value = 1;

        // Analysers
        this.analyserNode = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
        this.canvas = this.shadowRoot.getElementById('canvas');

        this.analyserNodeForMeter = this.audioContext.createAnalyser();
        this.analyserNodeForMeter.fftSize = 1024;
        this.dataArrayForMeter = new Uint8Array(this.analyserNodeForMeter.frequencyBinCount);
        this.connectNodes();

        requestAnimationFrame(this.visualize.bind(this));
    }

    connectNodes() {
        const gainMediaElementSource = this.audioContext.createMediaElementSource(this.audio);

        // connect nodes together
        gainMediaElementSource.connect(this.equalizers[0]);
        for(let i = 0; i < this.equalizers.length - 1; i++) {
            this.equalizers[i].connect(this.equalizers[i + 1]);
        }
        this.equalizers[this.equalizers.length - 1].connect(this.pannerNode);
        this.pannerNode.connect(this.gainNode);
        this.gainNode.connect(this.analyserNodeForMeter);
        this.analyserNodeForMeter.connect(this.analyserNode);
        this.analyserNode.connect(this.audioContext.destination);
        // this.directGain.connect(this.convolverNode);
        // this.convolverNode.connect(this.convolverGain);
        // this.convolverGain.connect(this.audioContext.destination);
    }

    visualize() {
        const canvasContext = this.canvas.getContext('2d');
        const bufferLength = this.analyserNode.frequencyBinCount;
        const width = this.canvas.width;
        const height = this.canvas.height;

        // Or use rgba fill to give a slight blur effect
        canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
        canvasContext.fillRect(0, 0, width, height);

        if (this.displayFrequencies) {
            this.visualizeFrequencies(canvasContext, bufferLength, width, height)
        } else {
            this.visualizeWave(canvasContext, bufferLength, width, height)
        }
        this.updateVolumeMeter();

        requestAnimationFrame(this.visualize.bind(this));
    }

    visualizeWave(canvasContext, bufferLength, width, height) {
        this.analyserNode.fftSize = 2048;
        this.analyserNode.getByteTimeDomainData(this.dataArray);

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'red';

        canvasContext.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = this.dataArray[i] / 255;
            const y = v * height;
            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }
            x += sliceWidth;
        }
        canvasContext.lineTo(width, height / 2);
        canvasContext.stroke();
    }

    visualizeFrequencies(canvasContext, bufferLength, width, height) {
        this.analyserNode.fftSize = 256;
        this.analyserNode.getByteFrequencyData(this.dataArray);

        const barWidth = width / bufferLength;
        let barHeight;
        let x = 0;
        // values go from 0 to 255 and the canvas height is 100. Let's rescale
        // before drawing. This is the scale factor
        const heightScale = height / 128;
        for (let i = 0; i < bufferLength; i++) {
            // between 0 and 255
            barHeight = this.dataArray[i];

            // The color is red but lighter or darker depending on the value
            canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            // scale from [0, 255] to the canvas height [0, height] pixels
            barHeight *= heightScale;
            // draw the bar
            canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

            // 1 is the number of pixels between bars - you can change it
            x += barWidth + 1;
        }
    }

    updateVolumeMeter() {
        this.analyserNodeForMeter.getByteFrequencyData(this.dataArrayForMeter);
        this.shadowRoot.getElementById('meter').value = this.getAverageVolume(this.dataArrayForMeter);
    }

    getAverageVolume(array) {
        let values = 0;
        let average;
        const length = array.length;
        // get all the frequency amplitudes
        for (let i = 0; i < length; i++) {
            values += array[i];
        }
        average = values / length;
        return average;
    }

    loadImpulse(url, callback) {
        let ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open('GET', url, true);
        ajaxRequest.responseType = "arraybuffer";
        ajaxRequest.onload = () => {
            this.audioContext.decodeAudioData(ajaxRequest.response,  (buffer) => {
                this.decodedImpulse = buffer;
                callback();
            });
        };

        ajaxRequest.onerror = function(e) {
            console.log("Error with decoding audio data" + e.err);
        };

        ajaxRequest.send();
    }

    createEqualizers() {
        const equalizers = [];
        [60, 170, 350, 1000, 3500, 10000].forEach((freq) => {
            const eq = this.audioContext.createBiquadFilter();
            eq.frequency.value = freq;
            eq.type = "peaking";
            eq.gain.value = 0;
            equalizers.push(eq);
        });
        return equalizers;
    }

    changeEq(sliderVal, numEq) {
        const value = parseFloat(sliderVal);
        this.equalizers[numEq].gain.value = value;

        const output = this.shadowRoot.getElementById("eq" + numEq);
        output.value = value + " dB";
    }

    formatTime(duration) {
        const hours = parseInt((duration / 3600).toString()) % 24;
        const minutes = parseInt((duration / 60).toString()) % 60;
        const seconds = (duration % 60).toFixed();
        return (hours < 10 ? '0' : '') + hours  + ":" + (minutes < 10 ? '0' : '') + minutes  + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    setProgressBar() {
        const player = this.shadowRoot.getElementById('audio');
        const duration = isFinite(player.duration) ? player.duration : 0;
        const currentTime = player.currentTime;

        this.shadowRoot.getElementById('duration').innerText = '-' + this.formatTime(duration - currentTime);

        this.shadowRoot.getElementById('current-time').innerText = this.formatTime(currentTime);

        const progressbar = this.shadowRoot.getElementById('timeline');
        progressbar.value = duration ? (currentTime / duration) : 0;
        progressbar.addEventListener("click", seek);

        if (player.currentTime === player.duration) {
            this.shadowRoot.getElementById('playPause').innerHTML = '<img src="' + this.basePath + 'assets/buttons/play.png" alt="play icon">';
        }

        function seek(evt) {
            const percent = evt.offsetX / this.offsetWidth;
            player.currentTime = percent * player.duration;
            progressbar.value = percent / 100;
        }
    };

    playPause() {
        const button = this.shadowRoot.getElementById('playPause');
        if (this.audio.paused) {
            this.audio.play();
            button.innerHTML = '<img src="' + this.basePath + 'assets/buttons/pause.png" alt="pause icon">';
        } else {
            this.audio.pause();
            button.innerHTML = '<img src="' + this.basePath + 'assets/buttons/play.png" alt="play icon">';
        }
    }

    toggleLoop(){
        const button = this.shadowRoot.getElementById('loop');
        this.audio.loop = !this.audio.loop;
        const state = this.audio.loop ? 'on' : 'off';
        button.innerHTML = '<img src="' + this.basePath + 'assets/buttons/loop-' + state + '.png" alt="loop ' + state + ' icon">';
    }

    skip(value) {
        this.audio.currentTime += value;
    }

    rewind(value) {
        this.audio.currentTime -= value;
    }

    restart() {
        this.audio.currentTime = 0;
    }
}

customElements.define("space-audio-player", SpaceAudioPlayer);

