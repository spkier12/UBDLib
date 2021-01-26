// Login the bot with provided token
export let socket = new WebSocket('wss://gateway.discord.gg/?v=8&encoding=json')
export let message = ""
let sequence: number = 0
export let token: String = ""
export let options: any


// Login our bot with a proivded token and settings
export function login(settings: any) {

    // Set options variable to what the function was called with
    options = settings

    // Check if there is a token even provided
    if (settings["token"] === undefined || options["token"] === "") {
        console.log('No token provided and all other settings untoutched we are now exiting')
        socket.close(1000, "No token provided")
        Deno.exit(0)
    }

    // Set token to variable
    token = settings["token"]

}


// handle open connection
socket.onopen = async() => {
    if (options["debug"] === true) {
        console.log('Connected to discord gateway')
    }

    await hearthbeat_request()
    await identify_request()
    
}


// Report errors to console and exit
socket.onerror = async(e: any) => {
    console.log(JSON.stringify(e))
    Deno.exit(0)
}


// Report closing to console and exit
socket.onclose = async(c: any) => {
    console.log(JSON.stringify(c))
    socket.close()
    Deno.exit(0)
}


// Recive all data and get sequence number
socket.onmessage = async(m: any) => {
    // Get all data and make a js object out of it
    const data = JSON.parse(m.data)
    // Get type
    const type = data["t"]

    // Get sequence nummber
    if (type == "READY") {
        sequence = data["s"]
    }
    if (options["debug"] === true) {
        if (data["op"] === 11) {
            console.log('YEY we recived a acknowledge back that hearthbeat was recived')
        }
    }
    
}


// Tell us who we are on the discord socket
async function identify_request() {
    if (options["debug"] === true) {
        console.log('Sending Identify request')
    }
    

    let idfr = 
    {
        "op": 2,
        "s": null,
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
    if (options["debug"] === true) {
        console.log('Sending hearthbeat')
    }

    let seq: any = null

    // Set the appropriate sequence nummber else just send null back if it's first time..
    if (sequence === 0) {
        seq = null
        
    } else {
        seq = sequence
    }


    let beat = { 
        "op": 1,
        "s": seq, 
        "d": { "heartbeat_interval": 41250} 
    }
    socket.send(JSON.stringify(beat))

    // Set it to call agen forever
    setTimeout(hearthbeat_request, 41250);
}
