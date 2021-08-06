const { Client } = require('discord.js-light'),
	client = new Client(),
	{ token } = require("./token.json");
client.on("ready",()=>{
console.log("selfbot is ready");
client.user.setPresence({activity:{name:"Termux | Linux terminal environment for Android"}});
});
client.login(token);
