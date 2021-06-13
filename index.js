const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
require('dotenv').config()
const moment = require('moment')

const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.categories = fs.readdirSync("./commands");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
    client.user.setActivity(`+help`, {type: 'PLAYING'});

    let activNum = 0;

    setInterval(function() {
        client.channels.cache.get('833776541011017758').setName(`Members: ${client.guilds.cache.get('539423844436410378').memberCount}`)
    }, 5 * 1000)
    
    setInterval(function() {
        const datetime = moment().utcOffset(+8).format("ddd, h:mm a");
        client.guilds.cache.get('539423844436410378').me.setNickname(datetime);
        }, 5 * 1000);

    setInterval(function() {
        if (activNum === 0) {
            client.user.setActivity(`over ${client.guilds.cache.get('539423844436410378').memberCount} users ⚠️`, {type: "WATCHING"});
            activNum = 1;
        } else if (activNum === 1) {
            client.user.setActivity(`over the Underground Den ⚠️`, {type: "WATCHING"});
            activNum = 2;
        } else if (activNum === 2) {
            client.user.setActivity(`+help ⚠️`, {type: "PLAYING"});
            activNum = 0;
    }

    }, 5 * 1000);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an issue executing that command!')
    }
})

client.on('guildMemberAdd', member => {
    console.log('User ' + member.user.tag + ' has joined the server!');
    var role = member.guild.roles.cache.find(r => r.id === '680742487492526083'); // weebs role
    member.roles.add(role)
})

client.login(process.env.TOKEN)

