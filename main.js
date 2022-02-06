function preload() {
    mustache = loadImage('https://i.postimg.cc/7PsC3XGp/mustache.png');
    sunglasses = loadImage('https://i.postimg.cc/Sx3214hC/wayfarers-sunglasses-1.png')
}

noseX = 0;
noseY = 0;

rightEyesX = 0;
rightEyesY = 0;

function setup() {
    canv = createCanvas(300, 300);
    console.log(canv);
    document.getElementById('canvasHolder').append(canv.elt);
    // canv.center();

    cam = createCapture(VIDEO);
    cam.size(300, 300);
    cam.hide();

    poseNet = ml5.poseNet(cam, () => {
        console.log('Posenet initialized');
    });

    poseNet.on('pose', results => {
        if (results.length > 0) {
            console.log(results);
            noseX = results[0].pose.nose.x;
            noseY = results[0].pose.nose.y;

            rightEyesX = results[0].pose.rightEye.x;
            rightEyesY = results[0].pose.rightEye.y;
        }


        // console.log(results);
        // noseX = results[0].pose.nose.x;
        // noseY = results[0].pose.nose.y;
    })
}

function draw() {
    image(cam, 0, 0, 300, 300);
    image(mustache, noseX - 33, noseY + 8, 66, 24);
    image(sunglasses,rightEyesX - 33, rightEyesY - 25,100,55);
}

function takeSnap() {
    save('newPhoto.png')
}