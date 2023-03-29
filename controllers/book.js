const { default: mongoose } = require('mongoose')
const {validationResult } = require('express-validator')
const ObjectId = require('mongodb').ObjectId;
const Book = require('../models/Book')


const getBookById = async (req,res) => {
    try{
        const result = await Book.findById(req.params.id);
        res.status(200).json(result)
    }catch(e){
        console.error(e);
    }
}

const getBooks  = async (req, res) => {
    try{
        mongoose.connect(process.env.MONGODB_URI);
        const result = await Book.find();

        res.status(200).json(result);

    } catch (e){
        console.error(e);
    }
}

const createBook  = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try{
        const book = await Book.create(req.body)
        res.status(201).json(book)
    }catch(e){
        res.status(500).send(e.message)
    }
}

const deleteBook = async (req, res) => {
    try{
        const bookId = new ObjectId(req.params.id);
        await Book.deleteOne({_id : bookId})
        res.status(204).send("Deleted book");
    }catch(e){
        console.error(e);
    }
}

const updateBook = async (req, res) => {
    try{
        const bookId = new ObjectId(req.params.id);
        const book = await Book.updateOne({_id : bookId}, req.body)
        res.status(204).json(book)
    } catch(e){
        console.log(e.message);
    }
}

module.exports = {
    getBookById,
    getBooks,
    createBook,
    deleteBook,
    updateBook
}