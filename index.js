require("dotenv").config();
const { Client } = require('discord.js-light'),
	client = new Client(),
	{ TOKEN } = process.env
client.on("ready",()=>{
	console.log(`selfbot is ready on ${client.user.tag}`);
	function updateStatus(){
        	client.user.setPresence({activity:{name:"Termux | Linux terminal environment for Android","state":`${require("child_process").execSync('printf $(cat ~/.sessions)')} session(s)`}});
        }
        updateStatus();
        setInterval(updateStatus,20000);
});
client.login(TOKEN);
