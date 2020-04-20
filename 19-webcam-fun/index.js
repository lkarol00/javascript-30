const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const effect1 = document.querySelector('.redEffect');
const effect2 = document.querySelector('.vintageEffect');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => console.log('Sorry, you can not use it :c', err))
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // Take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        if(effect1.checked) pixels = redEffect(pixels);;
        if(effect2.checked) pixels = vintageEffect(pixels);;

        //Mess with them 
        //
        //pixels = rgbSplit(pixels);
        //ctx.globalAlpha = 0.3;
        pixels = greenScreen(pixels);
        //Put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto(){
    //Played the sound
    snap.currentTime = 0;
    snap.play();

    //Take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'picture');
    link.innerHTML = `<img src="${data}" alt="Picture of yourself looking good"/>`
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //Red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;  //Green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //Blue
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i + 150] = pixels.data[i + 0]; //Red
        pixels.data[i + 500] = pixels.data[i + 1];  //Green
        pixels.data[i - 550] = pixels.data[i + 2]; //Blue
    }
    return pixels;
}

function vintageEffect(pixels){
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //Red
        pixels.data[i + 1] = pixels.data[i + 0] - 50;  //Green
        pixels.data[i + 2] = pixels.data[i + 0] * 0.5; //Blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
canvas.addEventListener('click', takePhoto);