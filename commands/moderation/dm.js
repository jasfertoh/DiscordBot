module.exports = {
    name: 'dm',
    category: 'moderation',
    description: 'DMs specified user.',
    execute (message, args) {
        if (!args[0]) {
            message.delete()
            return message.reply("Please specify a user to dm!");
        }
        
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (user == undefined) {
            message.delete()
            return message.reply("Please specify a valid user.");
        } 
        if (!args[1]) {
            message.delete()
            return message.reply("Can't send an empty message!")
        }
        args.shift()
        var newmsg = '';
        args.forEach(element => {
            newmsg += element + ' ';
        });
        try {
            message.delete()
            user.send(newmsg)
        } catch (err) {
            message.delete()
            message.channel.send(err)
        }
    } 
}