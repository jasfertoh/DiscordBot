module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Ping Command',
    async execute(message, args) {
        message.delete({ timeout: 2000 })
        const msg = await message.channel.send('Pinging...');

        msg.edit(`🏓 Pong!
        Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
    }
}