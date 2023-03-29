const { default: mongoose } = require('mongoose')
const {validationResult } = require('express-validator')
const ObjectId = require('mongodb').ObjectId;
const Book = require('../models/Book')


const getBookById = async (req,res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Endpoint gets Book by Id'
    try{
        const result = await Book.findById(req.params.id);
        res.status(200).json(result)
    }catch(e){
        console.error(e);
    }

            /**
     * @swagger
     * /api/endpoint:
     *   get:
     *     description: Descripción del endpoint
     *     security:
     *       - apiKey: []
     *     responses:
     *       '200':
     *         description: Respuesta exitosa
     */
}

const getBooks  = async (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Endpoint gets all Books'

    try{
        mongoose.connect(process.env.MONGODB_URI);
        const result = await Book.find();

        res.status(200).json(result);

    } catch (e){
        console.error(e);
    }

            /**
     * @swagger
     * /api/endpoint:
     *   get:
     *     description: Descripción del endpoint
     *     security:
     *       - apiKey: []
     *     responses:
     *       '200':
     *         description: Respuesta exitosa
     */
}

const createBook  = async (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Endpoint creates a new Books'
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

       /* #swagger.parameters['Book'] = {
          in: 'body',
          description: 'Book Information',
          required: true,
          schema: { 
            $title:"The Bible", 
            $pages:"987", 
            $author:"64237db7f22b89b6a6c91aaa",
            $datePublished:"1990-02-21",
            $publisher:"Holy Publisher"
          }
        } 
      */
  
    /**
     * @swagger
     * /api/endpoint:
     *   get:
     *     description: Descripción del endpoint
     *     security:
     *       - apiKey: []
     *     responses:
     *       '200':
     *         description: Respuesta exitosa
     */
}

const deleteBook = async (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Endpoint deletes book by Id'
    try{
        const bookId = new ObjectId(req.params.id);
        await Book.deleteOne({_id : bookId})
        res.status(204).send("Deleted book");
    }catch(e){
        console.error(e);
    }

        /**
     * @swagger
     * /api/endpoint:
     *   get:
     *     description: Descripción del endpoint
     *     security:
     *       - apiKey: []
     *     responses:
     *       '200':
     *         description: Respuesta exitosa
     */
}

const updateBook = async (req, res) => {
    // #swagger.tags = ['Books']
    // #swagger.description = 'Endpoint updates an existing book'
    try{
        const bookId = new ObjectId(req.params.id);
        const book = await Book.updateOne({_id : bookId}, req.body)
        res.status(204).json(book)
    } catch(e){
        console.log(e.message);
    }

           /* #swagger.parameters['Book'] = {
          in: 'body',
          description: 'Book Information',
          required: true,
          schema: { 
            $title:"The Bible", 
            $pages:"987", 
            $author:"64237db7f22b89b6a6c91aaa",
            $datePublished:"1990-02-21",
            $publisher:"Holy Publisher"
          }
        } 
      */
  
    /**
     * @swagger
     * /api/endpoint:
     *   get:
     *     description: Descripción del endpoint
     *     security:
     *       - apiKey: []
     *     responses:
     *       '200':
     *         description: Respuesta exitosa
     */
}

module.exports = {
    getBookById,
    getBooks,
    createBook,
    deleteBook,
    updateBook
}