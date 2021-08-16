require("dotenv").config();
const ws = require('ws'),
	os = require ("os"),
	{ token } = process.env,
	{ execSync } = require("child_process");
let dws = new ws('wss://gateway.discord.gg/?v=8&encoding=json'), interval, statusInterval, session_id=0, seq=0, reconnect = true, isResume, mfn, efn, identifyStr = JSON.stringify({
	  op: 2,
	 d: {
    token: token,
    intents: 0,
    properties: {
      $os: process.platform,
      $browser: "Discord Android",
      $device: os.type()
    		},
    		presence: {
    			activities: [{
						type: 0,
						name: "Termux: Linux terminal environment for Android",
						state: `${execSync("printf $(cat ~/.sessions)")} session(s)`
    			}],
    			status:"dnd",
    			afk:false
    		},
    		compress:false
			}
		});
mfn = dws.onmessage = ({data}) => {
const json = JSON.parse(data);
if(json.s) seq = json.s;
switch(json.op){
		case 10:
		reconnect = true;
		interval = setInterval(()=> {
					console.log("pinged");
					dws.send(JSON.stringify({op:1,d: seq}));
					reconnect = true;
			},json.d.heartbeat_interval);
		
		if(!isResume){
			dws.send(identifyStr);
			isResume = true;
		} else {
			dws.send(JSON.stringify({
	 		op:6,
	 		d:{
				token,
				session_id,
				seq
			}
			}));
			console.log("resumed");
		}
		break;
		case 1:
			console.log("pinged");
			dws.send(pingstr);
			reconnect = true;
			break;
		case 9:
			console.log("invalid session");
			break;
		case 7:
			reconnect = true;
			break;
		case 11:
			console.log("ponged");
			seq = json.d;
			reconnect = false;
	}
	if(!json.t) return;
	switch(json.t){
	case "READY":
	session_id = json.d.session_id;
	console.log(session_id, seq);
	console.log(`client ready on ${json.d.user.username}#${json.d.user.discriminator}`);
	statusInterval = setInterval(()=>{
			dws.send(JSON.stringify({
				op:3,
				d:{
					activities: [{
						type: 0,
						name: "Termux: Linux terminal environment for Android",
						state: `${execSync("printf $(cat ~/.sessions)")} session(s)`
    			}],
    			status:"dnd",
    			afk:false,
			since:null
				}
			}));
			console.log("status updated");
		},20000);
	break;
	case "RESUMED":
		console.log("really resumed");
}
	
};
efn = dws.onclose = dws.onerror = ({code, reason, error}) => {
console.log(`closed: ${error||code+' '+reason}`);
   if (reconnect) {
   clearInterval(interval);
   clearInterval(statusInterval);
   dws = new ws('wss://gateway.discord.gg/?v=8&encoding=json');
   dws.onclose = dws.onerror = efn;
   dws.onmessage = mfn;
   }
};
