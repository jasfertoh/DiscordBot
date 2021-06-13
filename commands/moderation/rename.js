module.exports = {
    name: 'rename',
    category: 'moderation',
    description: 'Renames the current channel',
    execute (message, args) {
        if (message.deletable) message.delete();

        if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You don't have permissions to use this command!")
        }

        if(!args[0])
        return message.reply ("You did not provide a name for the bot to update to!").then(message.delete({timeout:5000}))

        if(!args[1])
        message.channel.setName(args.join(" ").replace('+rename', '').replace(' ', '-'))
        message.channel.send("Bot has successfully updated the channel's name.")
            .then(m => m.delete({timeout: 2000}))
    }
}