import {config, msgauthor, msgchannelid} from './mod.ts'
// Get



//////////////////////////////////// channel related stuff goes below here //////////////////////////////////////////////

// Return a channel object back
export async function getchannelID(channelid: string) {
    const data = await fetch(`https://discord.com/api/v8/channels/${channelid}`, {
        headers: {
            "authorization": `Bot ${config.token}`
        }
    })

    const dt: any = JSON.parse(await data.text())

    return dt['id']

}


// Send

// Respond to last message with author
export async function reply(msg: string) {
    console.log('Sending msg..')

    // Dictonarry to send
    const sendms = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bot ${config.token}`
        },
        
        
        body: JSON.stringify({
            "content": `<@${msgauthor}> ${msg}`,
            "tts": false,
        })

    }

    // Contact discord gateway and tell us that we wanna send a message
    await fetch(`https://discord.com/api/v8/channels/${msgchannelid}/messages`, sendms)
}


// Send to channel
export async function send(channelid: string, msg?: string, emb?: {}) {
    console.log('Sending msg..')
    let embed = ""
    let msged
    
    // if emb equal null then just tell it to be a normal message
    if (emb === undefined) {
        embed = 'fields?'
    } else {
        embed = "fields"
    }

    // If no msg provided then don't send any simple as that
    if (msg === undefined) {
        msged = ""
    } else {
        msged = msg
    }

    // Dictonarry to send
    const sendms = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bot ${config.token}`
        },
        
        
        body: JSON.stringify({
            "content": msg,
            "tts": false,
            embed: emb
        })

    }

    // Contact discord gateway and tell us that we wanna send a message
    await fetch(`https://discord.com/api/v8/channels/${channelid}/messages`, sendms)
}
