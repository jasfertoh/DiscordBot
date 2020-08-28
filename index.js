const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const moment = require("moment");


const client = new Client({
    disableEveryone: true
});

const catcherr = (err, message) => {
    client.user.get("591515920099442689").send("There was an error in channel " + message.channel + " in server " + message.guild );
    client.user.get("591515920099442689").send ("ERROR ```" + err +  " ```");
}

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity(`+help ⚠️`, {type: "PLAYING"});
    
    let activNum = 0;

    setInterval(function() {
        client.channels.get('725147985176035379')
        .setName(`Members: ${client.guilds.get('539423844436410378').members.size}`)
    }, 5 * 1000)

    setInterval(function() {
        const datetime = moment().utcOffset(+8).format("ddd, h:mm a");
        client.guilds.get('539423844436410378').me.setNickname(datetime);
        }, 5 * 1000);

    setInterval(function() {
        if (activNum === 0) {
            client.user.setActivity(`over ${client.guilds.get('539423844436410378').members.size} users ⚠️`, {type: "WATCHING"});
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

client.on('guildMemberAdd', member => {

  console.log('User ' + member.username + ' has joined the server!')

  var role = member.guild.roles.find('name', 'WEEBS');

  member.addRole(role)
});

client.on("message", async message => {
    const prefix = "+";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.on("message", message => {
    if (message.content === "gg") {
        message.channel.send("GG!")
    }

    if (message.content == "hi" || message.content == "hello" || message.content == "shalom" || message.content == "sup" || message.content == "wassup") {
        var reply = ["Wassup! ", "Shalom, ", "Hello! ", "Ni hao! ", "Bonjour! ", "안녕 ", "Hola ", "Konnichiwa! ", "Guten tag ", "Olá "]
        var index = Math.floor(Math.random() * reply.length)
        message.channel.send(reply[index] + "<@" + message.author.id + ">")
    }
})
client.login(process.env.TOKEN);