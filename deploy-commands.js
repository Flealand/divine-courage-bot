const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [

	new SlashCommandBuilder()
	.setName('dc')
	.setDescription('Gives you divine courage CYKA!')
	.addIntegerOption(option =>
		option.setName('count')
			.setDescription('Optionally enter the number of items you want to role (0-10)')
			.setRequired(false))
	/*.addIntegerOption(option =>
		option.setName('goldtarget')
			.setDescription('Optionally enter the a target for the build price (5000 - 20000)')
			.setRequired(false))*/

]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, '787642900464009267'), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);