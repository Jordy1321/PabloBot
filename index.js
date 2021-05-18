const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = {};
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands[command.name] = command;
}

client.once('ready', () => {
    console.log('KermitBotv2 is online!');
    client.user.setActivity(`Tetris`);
  });

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (Object.keys(client.commands).includes(command)) {
		client.commands[command].execute(message, args)
	}
});

client.login(token);