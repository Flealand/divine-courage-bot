#!/usr/bin/env node

const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const { MessageEmbed } = require("discord.js");

const heroes = require("./heroes.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const boots = ["Boots of Travel", "Phase Boots", "Mana Boots", "Treads", "Tranquil Boots"];

const lanes = [
    "Safe lane",
    "Mid lane",
    "Off lane",
];

const items = [
    "Soul Ring",
    "Orb of Corrosion",
    "Falcon Blade",
    "Oblivion Staff",
    "Phase Boots",
    "Perseverance",
    "Mask of Madness",
    "Hand of Midas",
    "Helm of the Dominator",
    "Boots of Travel",
    "Moon Shard",
    "Helm of the Overlord",
    "Buckler",
    "Headdress",
    "Ring of Basilius",
    "Urn of Shadows",
    "Medallion of Courage",
    "Drum of Endurance",
    "Mekansm",
    "Holy Locket",
    "Vladmirs Offering",
    "Spirit Vessel",
    "Pipe of Insight",
    "Guardian Greaves",
    "Veil of Discord",
    "Glimmer Cape",
    "Force Staff",
    "Aether Lens",
    "Witch Blade",
    "Solar Crest",
    "Dagon Euls Scepter of Divinity",
    "Rod of Atos",
    "Orchid Malevolence",
    "Aghanims Scepter",
    "Refresher Orb",
    "Octarine Core",
    "Scythe of Vyse",
    "Aghanims Blessing",
    "Gleipnir",
    "Wind Waker",
    "Hood of Defiance",
    "Vanguard",
    "Blade Mail",
    "Aeon Disk",
    "Soul Booster",
    "Eternal Shroud",
    "Crimson Guard",
    "Lotus Orb",
    "Black King Bar",
    "Hurricane Pike",
    "Linkens Sphere",
    "Manta Style",
    "Shivas Guard",
    "Heart of Tarrasque",
    "Assault Cuirass",
    "Bloodstone",
    "Crystalys",
    "Meteor Hammer",
    "Armlet of Mordiggian",
    "Skull Basher",
    "Shadow Blade",
    "Desolator",
    "Battle Fury",
    "Ethereal Blade",
    "Nullifier",
    "Butterfly",
    "Monkey King Bar",
    "Radiance",
    "Daedalus",
    "Silver Edge",
    "Divine Rapier",
    "Bloodthorn",
    "Abyssal Blade",
    "Dragon Lance",
    "Kaya",
    "Sange",
    "Yasha",
    "Mage Slayer",
    "Echo Sabre",
    "Maelstrom",
    "Diffusal Blade",
    "Heavens Halberd",
    "Kaya and Sange",
    "Sange and Yasha",
    "Yasha and Kaya",
    "Satanic",
    "Eye of Skadi",
    "Mjollnir",
    "Arcane Blink",
    "Overwhelming Blink",
    "Swift Blink",
];


client.on("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    if (commandName === "dc") {

        const keys = Object.keys(heroes);
        const randIndex = Math.floor(Math.random() * keys.length);
        const randKey = keys[randIndex];
        const hero = heroes[randKey];

        const boot = boots[Math.floor(Math.random() * boots.length)];

        const item1 = items[Math.floor(Math.random() * items.length)];
        const item2 = items[Math.floor(Math.random() * items.length)];
        const item3 = items[Math.floor(Math.random() * items.length)];
        const item4 = items[Math.floor(Math.random() * items.length)];
        const lane = lanes[Math.floor(Math.random() * lanes.length)];

        results = [boot, hero, item1, item2, item3, item4];
        console.log(interaction.user.tag + ": Hero pic url: " + hero.url + " Items", item1 + " | " + item2 + " | " + item3 + " | " + item4);

        try {
            const embed = new MessageEmbed()
                .setThumbnail("https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + hero.url + ".png")
                .setTitle(hero.display + " - " + lane)
                .setDescription(boot)
                .addField("Items", item1 + " | " + item2 + " | " + item3 + " | " + item4, true);
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

client.login(token);
