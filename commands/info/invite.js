const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invite",
    category: "info",
    description: "Provides the bot's invite link",
    execute(message) {
        message.delete({timeout: 2000})
        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setDescription("Invite the bot to your own server! \n [Invite](https://discord.com/api/oauth2/authorize?client_id=833769332995260468&permissions=8&scope=bot) (Admin Perms)")
            .setTitle("Invite Link:")
        message.channel.send(embed);
    }
}