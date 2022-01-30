#!/usr/bin/env node

const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const { MessageEmbed } = require("discord.js");

const heroes = require("./heroes.json");
const items = require("./items.json");
const boots = require("./boots.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const lanes = [
    "Safe lane",
    "Mid lane",
    "Off lane",
];

client.on("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    if (commandName === "dc") {

        const hero = getRandomFromJson(heroes);
        const boot = getRandomFromJson(boots);

        const item1 = getRandomFromJson(items);
        const item2 = getRandomFromJson(items);
        const item3 = getRandomFromJson(items);
        const item4 = getRandomFromJson(items);
        const lane = lanes[Math.floor(Math.random() * lanes.length)];

        const totalBuildPrice = +item1.price + +item2.price + +item3.price + +item4.price  + +boot.price

        console.log(interaction.user.tag + ": Hero pic url: " + hero.url + " Items", item1.display + " | " + item2.display + " | " + item3.display + " | " + item4.display);

        try {
            const embed = new MessageEmbed()
                .setThumbnail("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + hero.url + ".png")
                .setTitle(hero.display + " - " + lane)
                .setDescription(boot.display)
                .addField("Items", item1.display + " | " + item2.display + " | " + item3.display + " | " + item4.display, true)
                .setFooter({ text: 'Total build price: ' + totalBuildPrice + " gold."});
            await interaction.reply({ embeds: [embed] });


        } catch (error) {
            console.log(error);
        }

    }
    if (commandName === "ping") {
        await interaction.reply("Pong!");
    } else if (commandName === "server") {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === "user") {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});


function getRandomFromJson(jsonObj) {

    const keys = Object.keys(jsonObj);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    return jsonObj[randKey];

}

client.login(token);
