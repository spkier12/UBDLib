import {gateway} from './deps.ts'

export async function auth(channelid: string) {
    try {
        await fetch(`https://discord.com/api/v8/channels/${channelid}`, {
            headers: {
                "authorization": `Bot ${gateway.token}`
            }
        })
    } catch(e) {
        console.log(e)
    }

}



// Send text messages
export async function sendmsg(msg: any, channelid: string) {
    console.log('Sending msg..')
    const sendms = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bot ${gateway.token}`
        },
        
        
        body: JSON.stringify({
            "content": msg,
            "tts": false,
        })

    }

    await fetch(`https://discord.com/api/v8/channels/${channelid}/messages`, sendms)
}