const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {addNote, getNotes, removeNote, updateNote} = require('./notes.controller')

const port = 3000

const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))

app.put('/:id', async (req, res) => {
    console.log('id', req.params.id, req.body.title)
    await updateNote(req.params.id, req.body.title)
    res.render('index', {
        title: "some title",
        notes: await getNotes(),
        created: false
    })
})

app.get('/', async (req, res) => {
    res.render('index', {
        title: "some title",
        notes: await getNotes(),
        created: false
    })
})
app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: "some title",
        notes: await getNotes(),
        created: true
    })
})
app.delete('/:id', async (req, res) => {
    console.log('id', req.params.id)
    await removeNote(req.params.id)
    res.render('index', {
        title: "some title",
        notes: await getNotes(),
        created: false
    })
})
app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})