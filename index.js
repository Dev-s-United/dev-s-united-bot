
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// adding commands to the collection. from commands/..
client.commands = new Collection();
const commandspath = path.join(__dirname,'commands');
const commandFiles = fs.readdirSync(commandspath).filter(file=>file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandspath,file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	/*
	if (interaction.commandName === 'hay'){
		await interaction.channel.reply('Pong! test');
	}
	*/
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);