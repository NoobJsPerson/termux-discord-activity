require("dotenv").config();
const { Client } = require('discord.js-light'),
	client = new Client(),
	{ TOKEN } = process.env
client.on("ready",()=>{
	console.log("selfbot is ready");
	client.user.setPresence({activity:{name:"Termux | Linux terminal environment for Android"}});
});
client.login(TOKEN);
