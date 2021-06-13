const randomPuppy = require("random-puppy");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'meme',
    category: 'fun',
    description: "Provides a random meme",
    execute(message) {
        if (message.deletable) message.delete();
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You can't use this command...").then(m => m.delete(5000))
        }

        let reddit = [
            'memes',
            'dankmemes',
            'dankmeme',
            'wholesomememes'
        ]

        let index = Math.floor(Math.random() * reddit.length)
        let subreddit = reddit[index];

        randomPuppy(subreddit)
        .then(url => {
            const newEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Here's your meme!`)
                .setURL(`https://reddit.com/r/${subreddit}`)
                .setImage(url)
                .setTimestamp()
                .setFooter('Meme command is nice, yes!', message.author.avatarURL)
            message.channel.send(newEmbed)
        });
    }
}