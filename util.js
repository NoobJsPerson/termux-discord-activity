const { execSync } = require("child_process");
function setStatus(){
	const obj = {
		name: "Termux: Linux terminal environment for Android"
		status: `${execSync("printf $(cat ~./sessions)")} session(s)`
	}
	
}
