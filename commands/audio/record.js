const fs = require('fs')

module.exports = {
    name: 'record',
    category: 'audio',
    description: 'Records audio in voice channel',
    async execute (message, args) {
        message.delete({ timeout: 2000 })
        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send('Please join a voice channel first!');

        const connection = await message.member.voice.channel.join();
        const receiver = connection.receiver.createStream(message.member, {
            mode: 'pcm',
            end: 'silence'
        });

        const writer = receiver.pipe(fs.createWriteStream(`./audiofiles/recorded-${message.author.id}.pcm`));
        writer.on('finish', () => {
            message.member.voice.channel.leave();
            message.channel.send('Finished recording!');
        })
    }
}