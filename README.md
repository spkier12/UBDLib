Discord API library for Deno 1.7.x

> https://discord.gg/6bSzGxWbAB

***
Features
    Secure and stable by default, - We try to aim for a secure and stable library
    Easy to use and get started with. - No need to mess around with bunhc of configs, import the library and start right away!
    Goal to support the entire API - Atm this library is highly unstable and not worth using atm, please do NOT fork it atm either as changes will happen so rapidly.
    

***
MINIMAL BOT:
````
import { bot, ctx, gateway} from './mod.ts'

// Login to the gateway using a provided settings that is available
gateway.login({
    "token": "mytokenhere",
    "debug": false
})

// Once the bot is ready let us know
bot.on('ready', async(botdata: any) => {
    console.log(`Bot: ${botdata.username} is now online`)

    // Authenticate with the REstAPI choose a random discord text channel id where guild has the bot
    await ctx.getchannelID('790181142711631872')

})

// On every message give us the messagedata we can listen to and content give us the msg in pure string
// Note: messagedata.content is the same as just content
bot.on('message', async(msg: any) => {


    await ctx.send(msg.channel_id, `hello <@${msg.author.id}> This is what you wrote: ${msg.content}`)
})
````
