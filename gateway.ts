// Login the bot with provided token
export let socket = new WebSocket('wss://gateway.discord.gg/?v=8&encoding=json')
export let message = ""
let sequence: number = 0
export let token: String = ""

export function login(token0: string) {
    token = token0
}

// handle open connection
socket.onopen = async() => {
    console.log('Connected to discord gateway')
    await hearthbeat_request()
    await identify_request()
    
}

socket.onerror = async(e: any) => {
    console.log(JSON.stringify(e))
    Deno.exit(0)
}

socket.onclose = async(c: any) => {
    console.log(JSON.stringify(c))
    socket.close()
    Deno.exit(0)
}

socket.onmessage = async(m: any) => {

    // Get all data and make a js object out of it
    const data = JSON.parse(m.data)

    // Get type
    const type = data["t"]

    // Get sequence nummber
    if (type == "READY") {
        sequence = data["s"]
    }
}





async function identify_request() {
    console.log('Sending Identify request')
    let seq: any = null

    // Set the appropriate sequence nummber else just send null back if it's first time..
    if (sequence === 0) {
        seq = null
        
    } else {
        seq = sequence
    }

    let idfr = 
    {
        "op": 2,
        "s": seq,
        "d": {
            "token": token,
            "intents": 513,
            "properties": {
                "$os": "linux",
                "$browser": "UBDlib",
                "$device": "UBDlib"
            }
        }
    }
    socket.send(JSON.stringify(idfr))
    // setTimeout(identify_request, 41251);

}


// Sends OPcode 1 to tell discord i'm still here
async function hearthbeat_request() {
    console.log('Sending hearthbeat')
    let beat = { 
        "op": 1, 
        "d": { "heartbeat_interval": 41250} 
    }
    socket.send(JSON.stringify(beat))


    setTimeout(hearthbeat_request, 41250);
}
