const { execSync } = require("child_process");
function setActivity(){
	
}
function setStatus(){
	const obj = {
		type: 0,
		name: "Termux: Linux terminal environment for Android",
		status: `${execSync("printf $(cat ~./sessions)")} session(s)`
	};
	
}
