const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = []; /*	.map(command => command.toJSON()); */

const commandspath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandspath).filter(file =>file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandspath,file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);


rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

	/* delete registed command
	rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'comamnd_id')) // command_id -> integration>bot  
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);
	*/