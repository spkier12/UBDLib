import { name } from './title.ts'
import { controller } from './controller_path.ts'

export let data = {
    controllers: [],
    debug: true,
    ip: "127.0.0.1",
    port: 1020,
    header: "HTTP/1.1 200 OK\r\n",
    webserver: "Server: UBWS\r\n",
    body: `Hello world how are you today?`,
    bodylength: "\r\n\r\n",
}

UBWS()
export async function UBWS() {
    let srv = Deno.listen({hostname: data["ip"], port: data["port"]})
    console.log(name)
    console.log("UBWS (Ulrik Bruns web server) has started...")
    console.log(`\r\nAvailable controllers: ${data.controllers}\r\n`)
    console.log(`Debug mode: ${data.debug}\r\nHeader: ${data.header}`)

    // Handle request data
    for await(const conn of srv) {
        // Let's handle the data first
        let buffer = new Uint8Array(2048)
        await conn.read(buffer)
        let dc = new TextDecoder().decode(buffer).split(" ")

        // Event emiter

        // Handle controller paths

        // If debug is true then it will print to console else it will be silent 
        if (data.debug) {
            console.log(`UBWS Server Type: ${dc[0]} Path: ${dc[1]}`)
        }

        // Handle favicon
        if (dc[1].includes("/favicon.ico")) data.body = "https://532386f9a72d1dd857a8-41058da2837557ec5bfc3b00e1f6cf43.ssl.cf5.rackcdn.com/wp-content/uploads/2019/09/Depositphotos_24867337_s-2019-300x189.jpg"
    
        // Handle data and get the correct body length encode it and send it then close connection..
        data["bodylength"] = data["body"].length.toString() + "\r\n\r\n"
        const resp = new TextEncoder().encode(data.header + data.webserver + data.bodylength + data.body)
        await Deno.writeAll(conn, resp)
        await conn.closeWrite()
        data.body = ""
    }
}

