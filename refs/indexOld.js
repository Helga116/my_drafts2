const yargs = require('yargs')
const pkg = require('./package.json')
const {addNote, printNotes, removeNote} = require('./notes.controller')


yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true
        }
    },
    async handler({title}) {
        await addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    // builder: {
    //     title: {
    //         type: "string",
    //         describe: "Note title",
    //         demandOption: true
    //     }
    // },
    async handler() {
        const notes = await printNotes()
        console.log(notes)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    builder: {
        id: {
            type: "string",
            describe: "Note id",
            demandOption: true
        }
    },
    async handler({id}) {
        const notes = await removeNote(id)
        console.log(notes)
    }
})

yargs.parse()