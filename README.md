THIS IS A PRE-ALPHA RELEASE AND NOT READY FOR PRODUCTION!!
DO NOT USE OR FORK THIS AS MAJOR CHANGES WILL HAPPEND

SIMPLE EXAMPLE ON HOW THE BOT WORKS


Import the bot to listen to events, import auth to authenticate to RestAPI, import sendmsg to send simple msg to -
provided channel and import gateway so we can login with a provided token
```
import { bot, auth, sendmsg, gateway} from 'https://raw.githubusercontent.com/spkier12/UBDLib/main/mod.ts'
```

Login to the gateway using a provided token
````
gateway.login("NzI1ODIwMzY3MTgwMTM2NDk4.XvUS5A.-J11asBa1EVhAhU")
````
The id of the bot / a simple variable to hold the bot id for later usage, witch is explained later down:
```
let botid: any = null
```

Once the bot is ready let us know
```
bot.on('ready', async(botdata: any) => {
    console.log(`Bot: ${botdata.username} is now online`)

    // Set the id of the bot this can only be done one time
    botid = botdata.id

    // Authenticate with the REstAPI choose a random discord text channel id where guild has the bot
    await auth('790181142711631872')

})
````
On every message give us the messagedata we can listen to and content give us the msg in pure string
Note: messagedata.content is the same as just content
````
bot.on('message', async(messagedata: any, content: string) => {

    // Log the message author's username and when he joined the guild and the message he wrote to the console.
    console.log(`Author - ${messagedata.author.username} Joined at - ${messagedata.member.joined_at} Msg - ${content}`)

    // If message content author id is equal to the bot it then do nothing...
    if (messagedata.author.id === botid) {
        console.log('Msg author id is equal to bot id so returning function..')
        return
    }

    // Send a text message to a provided channel
    await sendmsg(`Author - ${messagedata.author.username} Joined at - ${messagedata.member.joined_at} Msg - ${content}`, "790181142711631872")

})
````
