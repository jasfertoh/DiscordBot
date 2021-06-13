module.exports = {
    name: 'name',
    category: 'moderation',
    description: "Changes name of the bot",
    execute (message, args) {
        if (message.deletable) message.delete();
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You can't use this command...").then(m => m.delete(5000))
        }
        
        try {
            if(message.author.bot || message.channel.type == "group") return
            if ((args[0].length < 2) || (args[0].length > 32)) {
                return message.reply("Username must be between 2 and 32 in length!")
                .then(m => m.delete({timeout: 5000}))
            }
            if(!args[1] && (args[0].length >= 2) || (args[0].length <= 32)){
                const args1 = args.shift();
                message.channel.send("Bot's name has been changed.")
                message.client.user.setUsername(args1.toLocaleString());
            }
        }
        catch (err) {
            console.error(err, message);
        }
    }
}