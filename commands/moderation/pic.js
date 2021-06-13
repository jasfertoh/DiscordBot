const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pic',
    category: 'moderation',
    description: 'Obtains the pic of specified user.',
    execute(message, args) {
        if (!args[0]) {
            return message.reply("Please specify a user.");
        }
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const image = new MessageEmbed()
        .setTitle("Here's your image")
        .setImage(user.user.displayAvatarURL())
        message.channel.send(image)
    }
}