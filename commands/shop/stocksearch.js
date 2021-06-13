const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'stocksearch',
    category: 'shop',
    description: 'Search up stock on Plati.ru',
    async execute(message, args) {
        message.delete({ timeout: 2000 })
        let pagenum = 1;
        if(!args[0]) {
            return message.channel.send('Please enter the item you wish to look for.');
        }
        let file = await fetch(`https://plati.io/api/search.ashx?query=${args[0]}&pagesize=5&pagenum=${pagenum}&visibleOnly=true&response=response.json`).then(response => response.json());
        let newMsg = new MessageEmbed()
        .setTitle(`Search results for ${args[0]}`)
        .addFields(
            { name: `Page ${file.Pagenum}`, value: '1: ' + file.items[0].name_eng + '\n \n' + '2: ' + file.items[1].name_eng + '\n \n' + '3: ' + file.items[2].name_eng + '\n \n' + '4: ' + file.items[3].name_eng + '\n \n' + '5: ' + file.items[4].name_eng + '\n \n'},
        )
        message.channel.send(newMsg)
        let filter = m => m.author.id === message.author.id
        message.channel.send(`Please return a value for the one you wish to look at!`).then(() => {
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 120000,
            errors: ['time']
        })
        .then(message => {
            message = message.first()
            const order = parseInt(message.content) - 1;
            const newMessage = new MessageEmbed()
                .setTitle(`${file.items[order].name_eng}`)
                .addFields(
                    { name: 'Description:', value: `Name: ${file.items[order].name_eng}\nPrice (USD): ${file.items[order].price_usd}\nLink: ${file.items[order].url}\nSeller Rating: ${file.items[order].seller_rating}`}
                )
            message.channel.send(newMessage);
        })
        .catch(collected => {
            message.channel.send('Timeout');
        });
    })
}
}