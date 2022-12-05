s1 = "";
s2 = "";

s1st = "";
s2st = "";

srw = 0;
slw = 0;

rwX = 0;
rwY = 0;

lwX = 0;
lwY = 0;

function preload()
{
	s1 = loadSound("music.mp3");
	s2 = loadSound("music2.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	srw =  results[0].pose.keypoints[10].score;
	slw =  results[0].pose.keypoints[9].score;
	rwX = results[0].pose.rightWrist.x;
	rwY = results[0].pose.rightWrist.y;
	lwX = results[0].pose.leftWrist.x;
	lwY = results[0].pose.leftWrist.y;
	console.log("Score Right Wrist = " + srw + "Score Left Wrist = " + slw);
	console.log("rightWristX = " + rwX +" rightWristY = "+ rwY);
	console.log("leftWristX = " + lwX +" leftWristY = "+ lwY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	
	s1st = s1.isPlaying();
	s2st = s2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(srw > 0.2)
	{ 
		circle(rwX,rwY,20);

			s2.stop();

		if(s1st == false)
		{
			s1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}

	if(slw > 0.2)
	{
		circle(lwX,lwY,20);

			s1.stop();

		if(s2st == false)
		{
			s2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
		}
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
