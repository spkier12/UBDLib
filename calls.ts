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



// Send to channel
export async function send(channelid: string, msg: any, emb: any) {
    console.log('Sending msg..')
    let embed = ""
    
    // if emb equal null then just tell it to be a normal message
    if (emb === null) {
        embed = 'fields?'
    } else {
        embed = "fields"
    }


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

// // send embed
// export async function sendembed(channelid: string, color: string, title: string, desc: string, fields: any) {
//     if (fields == '{}') {
//         fields = ""
//     }
//     console.log('Sending embed..')
//     const sendembed = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             "authorization": `Bot ${gateway.token}`
//         },
        
//         body: JSON.stringify({
//             "content": "",
//             "tts": false,
//             "embed": {
//                 "title": title,
//                 "color": 255,
//                 "description": desc,
//                 "fields": fields
//             }
//         })
//     }


//    const t = await fetch(`https://discord.com/api/v8/channels/${channelid}/messages`, sendembed)
//    console.log(JSON.stringify(JSON.parse(await t.text()), null, 4))
// }