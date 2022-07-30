const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: 'string',
    },
    content: {
        type: 'string',
    },
    tag: {
        type: 'string',
    },
    date: {
        type: 'date',
        default: Date.now()
    },
    lastUpdated: {
        type: 'date',
        default: null
    }
})
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;