import {name} from './title.ts'

export let data = {
    controllers: [],
    paths: [],
    debug: true,
    header: "HTTP/1.1 200 OK\r\n",
    webserver: "Server: UBWS\r\n",
    body: `Hello world how are you today?`,
    bodylength: "\r\n\r\n",
}
UBWS("127.0.0.1", 1020)
export async function UBWS(ip: string, port: Number) {
    let srv = Deno.listen({hostname: "127.0.0.1", port: 1020})
    console.log(name)
    console.log("UBWS (Ulrik Bruns web server) has started...")
    console.log(`Available paths: ${data.paths}\r\nAvailable controllers: ${data.controllers}\r\n`)
    console.log(`Debug mode: ${data.debug}\r\nHeader: ${data.header}`)

    // Handle request data
    for await(const conn of srv) {
        // Let's handle the data first
        let buffer = new Uint8Array(2048)
        await conn.read(buffer)
        let dc = new TextDecoder().decode(buffer).split(" ")
    
        // If debug is true then it will print to console else it will be silent 
        if (data.debug) {
            console.log(`UBWS Server Type: ${dc[0]} Path: ${dc[1]}`)
        }
    
        // Handle data and get the correct body length encode it and send it then close connection..
        data["bodylength"] = data["body"].length.toString() + "\r\n\r\n"
        const resp = new TextEncoder().encode(data.header + data.webserver + data.bodylength + data.body)
        await Deno.writeAll(conn, resp)
        await conn.closeWrite()
        data.body = ""
    }
}

