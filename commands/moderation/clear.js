module.exports = {
    name: 'clear',
    category: 'moderation',
    description: "Clears specified number of messages in channel.",
    execute(message, args) {
        if (!args[0]) {
            return message.channel.send("Please enter a value ranging from 1-100!");
        }
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
        .catch(err => message.reply(`Something went wrong... ${err}`));
    }
}