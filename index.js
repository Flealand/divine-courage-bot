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

const MIN_ITEMS = 0;
const MAX_ITEMS = 10;


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
        let itemCount = 4;
        const itemsCountArgument = interaction.options.getInteger('count');
        if (itemsCountArgument && itemsCountArgument !== null) {
            if (itemsCountArgument >= MIN_ITEMS || itemsCountArgument <= MAX_ITEMS) {
                itemCount = itemsCountArgument;
            }
        }


        const hero = getRandomFromJson(heroes);
        const boot = getRandomFromJson(boots);
        const lane = lanes[Math.floor(Math.random() * lanes.length)];

        const itemArr = [];
        let totalBuildPrice = +boot.price;
        const imageUrls = [];
        imageUrls.push('./pics/items/' + boot.picUrl);

        let logString = interaction.user.tag + ": Hero pic url: " + hero.url;
        for (let i = 0; i < itemCount; i++) {
            const item = getRandomFromJson(items);
            itemArr.push(item);
            totalBuildPrice += +item.price;
            imageUrls.push('./pics/items/' + item.picUrl);
            logString += ' ' + item.display + " | ";
        }

        console.log(logString);

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


        const tempImg = await join.joinImages(imageUrls, { direction: 'horizontal' });
        await tempImg.toFile('items.png');

        try {
            const embed = new MessageEmbed()
                .setTitle(hero.display + " - " + lane)
                .setImage("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + hero.url + ".png")
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

    } else if (commandName === "item") {

        const item = getRandomFromJson(items);
        try {
            if (!fs.existsSync('./pics/items' + item.picUrl)) {
                await downloadImage('https://www.dotafire.com/images/item/' + item.picUrl, './pics/items');
            }
        } catch (err) {
            console.error(err)
        }

        try {
            const embed = new MessageEmbed()
                .setTitle(item.display)
                .setImage('https://www.dotafire.com/images/item/' + item.picUrl, './pics/items');
            await interaction.reply({
                embeds: [embed],
            });


        } catch (error) {
            console.log(error);
        }

    }
    else if (commandName === "ping") {
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
