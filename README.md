THIS IS A PRE-ALPHA RELEASE AND NOT READY FOR PRODUCTION!!
DO NOT USE OR FORK THIS AS MAJOR CHANGES WILL HAPPEND


Here is a small example on how to setup a bot
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
