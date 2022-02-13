const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [

	new SlashCommandBuilder()
		.setName('dc')
		.setDescription('Randoms a hero, items and a lane for you to play.')
		.addIntegerOption(option =>
			option.setName('count')
				.setDescription('Optionally enter the number of items you want to role (0-10).')
				.setRequired(false)),
	new SlashCommandBuilder()
		.setName('item')
		.setDescription('Gives you a random item!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);