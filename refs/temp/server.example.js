const http = require('http')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs/promises')
const {addNote} = require('./notes.controller')


const port = 3000

const basePath = path.join(__dirname, 'pages')

const server = http.createServer(async (req, res) => {
    if(req.method === 'GET') {
        const content = await fs.readFile(path.join(basePath, 'index.ejs' ))
        res.setHeader('Content-type', 'text/html')
        res.writeHead(200)
        res.end(content)
    } else if(req.method === 'POST') {
        const body = []
        res.writeHead(200, {
            'Content-type': 'text/plain; charset=utf-8'
        })
        req.on('data', (data) => {
            body.push(Buffer.from(data))
        })
        req.on('end', () => {
            const title = body.toString().split('=')[1].replaceAll('+', ' ')
            console.log(title)
            addNote(title)
            res.end(`Title = ${title}`)
        })

    }
})

server.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})