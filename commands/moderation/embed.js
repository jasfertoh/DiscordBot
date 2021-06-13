const { MessageEmbed } = require('discord.js')

module.exports=  {
    name: "embed",
    category: 'moderation',
    description: "Sends an embed message",
    execute (message, args) {
        if (message.deletable) message.delete();
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You can't use this command...").then(m => m.delete({timeout: 5000}))
        }

        const roleColor = message.member.displayHexColor;

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete({timeout: 5000}));

        if (args[0]) {
            const embed = new MessageEmbed()
                .setDescription(args.join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);
            message.channel.send(embed);
        }
    }
}