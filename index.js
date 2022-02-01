#!/usr/bin/env node

const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const { MessageEmbed } = require("discord.js");

const heroes = require("./heroes.json");
const items = require("./items.json");
const boots = require("./boots.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const download = require('image-downloader');
const join = require('join-images');
const fs = require('fs');



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

        const itemArr = [];

        const item1 = getRandomFromJson(items);
        itemArr.push(item1);
        const item2 = getRandomFromJson(items);
        itemArr.push(item2);
        const item3 = getRandomFromJson(items);
        itemArr.push(item3);
        const item4 = getRandomFromJson(items);
        itemArr.push(item4);
        const lane = lanes[Math.floor(Math.random() * lanes.length)];
        const totalBuildPrice = +item1.price + +item2.price + +item3.price + +item4.price + +boot.price;

        console.log(interaction.user.tag + ": Hero pic url: " + hero.url + " Items", item1.display + " | " + item2.display + " | " + item3.display + " | " + item4.display);
        for (item of itemArr) {

            try {
                if (!fs.existsSync('./pics/items' + item.picUrl)) {
                    await downloadImage('https://www.dotafire.com/images/item/' + item.picUrl, './pics/items');
                }
            } catch (err) {
                console.error(err)
            }
        }

        try {
            if (!fs.existsSync('./pics/items' + boot.picUrl)) {
                await downloadImage('https://www.dotafire.com/images/item/' + boot.picUrl, './pics/items');
            }
        } catch (err) {
            console.error(err)
        }


        const tempImg = await join.joinImages(['./pics/items/' + boot.picUrl, './pics/items/' + item1.picUrl, './pics/items/' + item2.picUrl, './pics/items/' + item3.picUrl, './pics/items/' + item4.picUrl], { direction: 'horizontal' });
        await tempImg.toFile('items.png');




        try {
            const embed = new MessageEmbed()
                .setTitle(hero.display + " - " + lane)
                .setImage("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + hero.url + ".png")
                // .setDescription(boot.display)
                // .addField("Items", item1.display + " | " + item2.display + " | " + item3.display + " | " + item4.display, true)
                .setFooter({ text: 'Total build price: ' + totalBuildPrice + " gold." });
            await interaction.reply({
                embeds: [embed], files: [{
                    attachment: './items.png',
                    name: 'items.png'
                }]
            });


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

function downloadImage(url, filepath) {
    return download.image({
        url,
        dest: filepath
    });
}

client.login(token);
