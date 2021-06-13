const fs = require('fs');

module.exports = {
    name: 'play',
    category: 'audio',
    description: 'Plays the recorded audio.',
    async execute(message, args) {
        message.delete({ timeout: 2000 })
        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send('Please join a voice channel first!');

        if(!fs.existsSync(`./audiofiles/recorded-${message.author.id}.pcm`)) return message.channel.send('Your audio has not been recorded.');

        const connection = await message.member.voice.channel.join();
        const stream = fs.createReadStream(`./audiofiles/recorded-${message.author.id}.pcm`);

        const dispatcher = connection.play(stream, {
            type: 'converted'
        })

        dispatcher.on('finish', () => {
            message.member.voice.channel.leave();
            return message.channel.send('Finished playing audio.')
        })
    }
}