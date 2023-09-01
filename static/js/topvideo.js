#document.addEventListener("DOMContentLoaded", function() {
#	navbar = document.getElementById("navbar");
#	var video = document.getElementById("topVideo");
#	console.log(video);
#// Play the video

// Seek to a specific frame based on variables
#	function seekToFrame() {
#		navbar = document.getElementById("navbar");
#		var frameToSeek = Math.round((window.pageYOffset / offsetTop) * 89);
#		console.log(window.pageYOffset);
#		console.log(offsetTop);
#		console.log(frameToSeek);
#		seekToFrame(frameToSeek);
#	}

#	window.addEventListener("scroll", function() {
#		seekToFrame();
#	});
#});