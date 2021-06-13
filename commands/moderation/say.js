module.exports = {
    name: 'say',
    category: 'moderation',
    description: 'Repeats user input',
    execute (message, args) {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(m => m.delete({timeout: 5000}));

        if (args.length < 0)
            return message.reply("Nothing to say?").then(m => m.delete({timeout: 5000}));

        if (args[0]) {
            message.channel.send(args.join(" "));
        }
    }
}