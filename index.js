#!/usr/bin/env node

const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const boots = ['Boots of Travel', 'Phase Boots', 'Mana Boots', 'Treads', 'Tranquil Boots'];

const heroes = [
    'Abaddon',
    'Alchemist',
    'Ancient Apparition',
    'Anti-Mage',
    'Arc Warden',
    'Axe',
    'Bane',
    'Batrider',
    'Beastmaster',
    'Bloodseeker',
    'Bounty Hunter',
    'Brewmaster',
    'Bristleback',
    'Broodmother',
    'Centaur Warrunner',
    'Chaos Knight',
    'Chen',
    'Clinkz',
    'Clockwerk',
    'Crystal Maiden',
    'Dark Seer',
    'Dark Willow',
    'Dawnbreaker',
    'Dazzle',
    'Death Prophet',
    'Disruptor',
    'Doom',
    'Dragon Knight',
    'Drow Ranger',
    'Earth Spirit',
    'Earthshaker',
    'Elder Titan',
    'Ember Spirit',
    'Enchantress',
    'Enigma',
    'Faceless Void',
    'Grimstroke',
    'Gyrocopter',
    'Hoodwink',
    'Huskar',
    'Invoker',
    'Io',
    'Jakiro',
    'Juggernaut',
    'Keeper of the Light',
    'Kunkka',
    'Legion Commander',
    'Leshrac',
    'Lich',
    'Lifestealer',
    'Lina',
    'Lion',
    'Lone Druid',
    'Luna',
    'Lycan',
    'Magnus',
    'Marci',
    'Mars',
    'Medusa',
    'Meepo',
    'Mirana',
    'Monkey King',
    'Morphling',
    'Naga Siren',
    'Natures Prophet',
    'Necrophos',
    'Night Stalker',
    'Nyx Assassin',
    'Ogre Magi',
    'Omniknight',
    'Oracle',
    'Outworld Destroyer',
    'Pangolier',
    'Phantom Assassin',
    'Phantom Lancer',
    'Phoenix',
    'Puck',
    'Pudge',
    'Pugna',
    'Queen of Pain',
    'Razor',
    'Riki',
    'Rubick',
    'Sand King',
    'Shadow Demon',
    'Shadow Fiend',
    'Shadow Shaman',
    'Silencer',
    'Skywrath Mage',
    'Slardar',
    'Slark',
    'Snapfire',
    'Sniper',
    'Spectre',
    'Spirit Breaker',
    'Storm Spirit',
    'Sven',
    'Techies',
    'Templar Assassin',
    'Terrorblade',
    'Tidehunter',
    'Timbersaw',
    'Tinker',
    'Tiny',
    'Treant Protector',
    'Troll Warlord',
    'Tusk',
    'Underlord',
    'Undying',
    'Ursa',
    'Vengeful Spirit',
    'Venomancer',
    'Viper',
    'Visage',
    'Void Spirit',
    'Warlock',
    'Weaver',
    'Windranger',
    'Winter Wyvern',
    'Witch Doctor',
    'Wraith King',
    'Zeus',
];


const items = [
    'Magic Wand',
    'Bracer',
    'Null Talisman',
    'Wraith Band',
    'Soul Ring',
    'Orb of Corrosion',
    'Falcon Blade',
    'Oblivion Staff',
    'Phase Boots',
    'Perseverance',
    'Mask of Madness',
    'Hand of Midas',
    'Helm of the Dominator',
    'Boots of Travel',
    'Moon Shard',
    'Helm of the Overlord',
    'Buckler',
    'Headdress',
    'Ring of Basilius',
    'Urn of Shadows',
    'Medallion of Courage',
    'Arcane Boots',
    'Drum of Endurance',
    'Mekansm',
    'Holy Locket',
    'Vladmirs Offering',
    'Spirit Vessel',
    'Pipe of Insight',
    'Guardian Greaves',
    'Veil of Discord',
    'Glimmer Cape',
    'Force Staff',
    'Aether Lens',
    'Witch Blade',
    'Solar Crest',
    'Dagon Euls Scepter of Divinity',
    'Rod of Atos',
    'Orchid Malevolence',
    'Aghanims Scepter',
    'Refresher Orb',
    'Octarine Core',
    'Scythe of Vyse',
    'Aghanims Blessing',
    'Gleipnir',
    'Wind Waker',
    'Hood of Defiance',
    'Vanguard',
    'Blade Mail',
    'Aeon Disk',
    'Soul Booster',
    'Eternal Shroud',
    'Crimson Guard',
    'Lotus Orb',
    'Black King Bar',
    'Hurricane Pike',
    'Linkens Sphere',
    'Manta Style',
    'Shivas Guard',
    'Heart of Tarrasque',
    'Assault Cuirass',
    'Bloodstone',
    'Crystalys',
    'Meteor Hammer',
    'Armlet of Mordiggian',
    'Skull Basher',
    'Shadow Blade',
    'Desolator',
    'Battle Fury',
    'Ethereal Blade',
    'Nullifier',
    'Butterfly',
    'Monkey King Bar',
    'Radiance',
    'Daedalus',
    'Silver Edge',
    'Divine Rapier',
    'Bloodthorn',
    'Abyssal Blade',
    'Dragon Lance',
    'Kaya',
    'Sange',
    'Yasha',
    'Mage Slayer',
    'Echo Sabre',
    'Maelstrom',
    'Diffusal Blade',
    'Heavens Halberd',
    'Kaya and Sange',
    'Sange and Yasha',
    'Yasha and Kaya',
    'Satanic',
    'Eye of Skadi',
    'Mjollnir',
    'Arcane Blink',
    'Overwhelming Blink',
    'Swift Blink',
];

client.on('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'dc') {

        const boot = boots[Math.floor(Math.random() * boots.length)];
        const hero = heroes[Math.floor(Math.random() * heroes.length)];

        const item1 = items[Math.floor(Math.random() * items.length)];
        const item2 = items[Math.floor(Math.random() * items.length)];
        const item3 = items[Math.floor(Math.random() * items.length)];
        const item4 = items[Math.floor(Math.random() * items.length)];

        results = [boot, hero, item1, item2, item3, item4];

        // inside a command, event listener, etc.
        const exampleEmbed = new MessageEmbed()
            .setThumbnail('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/' + hero.toLocaleLowerCase() + '.png')
            .setTitle(hero)
            .setDescription(boot)
            .addField('1', item1, true)
            .addField('2', item2, true)
            .addField('3', item3, true)
            .addField('4', item4, true)
            .setFooter({ text: interaction.user.tag });
        await interaction.reply({ embeds: [exampleEmbed] });

    }
    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});

client.login(token);
