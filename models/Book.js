const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    pages :{
        type : Number,
        required : true
    },
    author :{
        type : mongoose.SchemaTypes.ObjectId
    },
    datePublished : {
        type : Date,
        required : true
    },
    publisher : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Book", bookSchema)

