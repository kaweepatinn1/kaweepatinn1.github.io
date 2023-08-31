function changeMode() {
            let element = document.body;
			let button = document.getElementById("lightButton")
            let content = document.getElementById("changeModeA");
            if (content.src.includes("lightswitchlight.png")) {
                content.src = "./static/assets/lightswitchdark.png";
				element.className = "light-mode";
				button.className = "lightOn";
				document.title.color = "333";
            } else {
                content.src = "./static/assets/lightswitchlight.png";
				element.className = "dark-mode";
				button.className = "lightOff";
				document.title.color = "FFF";
            }
        }