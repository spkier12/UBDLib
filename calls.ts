import {gateway} from './deps.ts'

// Get

// Return a channel object back
export async function getchannelID(channelid: string) {
    const data = await fetch(`https://discord.com/api/v8/channels/${channelid}`, {
        headers: {
            "authorization": `Bot ${gateway.token}`
        }
    })

    return data.text()

}


// Send

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
            "authorization": `Bot ${gateway.token}`
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