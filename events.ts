import EventEmitter from 'https://deno.land/x/events/mod.ts'
import {gateway} from './deps.ts'

export const bot = new EventEmitter()


gateway.socket.onmessage = async(m) => {

    // Get all data and make a js object out of it
    const data = JSON.parse(m.data)

    // Get type
    const type = data["t"]

    // console.log(data)

    // Ready event fires only once
    if (type == "READY") {

        // Get all the stuff i want
        const botdata = data["d"]["user"]

        // Logg it for testing purposes
        // console.log(`Bot ID: ${botdata.id} Name: ${botdata.username} Confirm bot: ${botdata.bot}`)

        // Send to ready event
        bot.emit('ready', botdata)

        // stuff ready event outputs:
            // botdata.username | bot name,
            // botdata.id | your bot id,
            // botdata.bot | true,
            // botdata.avatar | outputs id
    }


    // Recive all messages
    if (type === 'MESSAGE_CREATE') {

        // Get all the parameters
        const messagedata = data["d"]
        const content = data["d"]["content"]

        // Logg it for testing purposes
        // console.log(messagedata.member.roles)

        // Send the message event
        bot.emit('message', messagedata, content)

        // Stuff message event outputs
            // messagedata.member.roles | outputs all the roleid the user has thru a list
            // messagedata.member.joined_at | outputs when the user joined 
            // messagedata.author.username | Outputs the user who created the message
            // messagedata.author.id | Gives you the id of the user who created the message
            // messagedata.channel_id | outputs the channel id the message was sendt inn

            // Get the context/messages use the 
                // content variable in function or :
                // messagedata.content
    }
}   