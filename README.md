# Discord Prefix

Discord Prefix is a simple [Node.js](https://nodejs.org/) module that lets you easily manage custom prefixes for your discord bot
- Unlimited servers
- Default prefix
- Super fast
- 100% Reliable
- Fast Support

**Note:** All data is reliably stored in an sqlite database.

## Installation
```
npm i discord-prefix
```

## Real Life Example
For use with discord.js
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = require('discord-prefix');

//if the server doesn't have a set prefix yet
let defaultPrefix = '!';

client.on('message' (message) => {
    //stop code execution if message is received in DMs
    if (!message.guild) return;

    //get the prefix for the discord server
    let guildPrefix = prefix.getPrefix(message.guild.id);

    //set prefix to the default prefix if there isn't one
    if (!guildPrefix) guildPrefix = defaultPrefix;

    //rest of the message event
    let args = message.content.slice(guildPrefix.length).split(' ');
    if (!message.content.startsWith(guildPrefix)) return;
    if (args[0].toLowerCase() === 'ping') {
        return message.channel.send('Pong!');
    };
});

client.login('token');
```

## Methods
**setPrefix**

Set the prefix into the database for a server:
```js
const prefix = require('discord-prefix');

prefix.setPrefix('!', 'guild_id');
```
**getPrefix**

Getting a prefix from the database:
```js
const prefix = require('discord-prefix');

prefix.setPrefix('!', 'guild_id');
console.log(prefix.getPrefix('guild_id'));
// -> !
```
**setPrefix**

Setting the default prefix
```js
const prefix = require('discord-prefix')

//Specify no server to change the default prefix.
prefix.setPrefix('!');

//Specify no server to get the default prefix.
console.log(prefix.getPrefix());
// -> !
```

## Links
- Docs (coming soon)
- [Discord.js Module](https://www.npmjs.com/package/discord.js)
- [Discord.js Docs](https://discord.js.org)
- [GitHub](https://github.com/RedLukeBug/discord-prefix)
- [Support Server](https://discord.gg/cQ2f4FPWRq)
- [Node.js](https://nodejs.org/)

## Help
Please, feel free to email me at redlukebug@gmail.com if you have any questions, or join the discord server for support [here](https://discord.gg/cQ2f4FPWRq)