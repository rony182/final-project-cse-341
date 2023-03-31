const { validationResult } = require("express-validator");
const Author = require("../models/Author");

const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // #swagger.tags = ['Authors']
  // #swagger.summary = 'Create a new author'
  // #swagger.description = 'Endpoint to create an author'
  try {
    const {
      name,
      birthdate,
      nationality,
      biography,
      website,
      socialMediaLinks,
      contactInformation,
      books,
    } = req.body;

    // check if books array contains valid book IDs
    if (books && books.length > 0) {
      const bookIds = await Book.find({ _id: { $in: books } }, "_id").lean();
      const invalidBookIds = books.filter(
        (id) => !bookIds.map((book) => String(book._id)).includes(String(id))
      );
      if (invalidBookIds.length > 0) {
        return res
          .status(400)
          .json({ msg: `Invalid book IDs: ${invalidBookIds.join(", ")}` });
      }
    }

    const author = new Author({
      name,
      birthdate,
      nationality,
      biography,
      website,
      socialMediaLinks,
      contactInformation,
      books,
    });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
  /* #swagger.parameters['Author'] = {
          in: 'body',
          description: 'Author Information',
          required: true,
          schema: { 
          $name:"Mario Vargas Llosa",
          $birthdate:"1936-03-28",
          $nationality:"Peruvian",
          $biography:"Mario Vargas Llosa is a famous author and essayist.",
          $website:"https://mariovargasllosa.net",
          $socialMediaLinks: ["https://www.twitter.com/mariovargasllosa"],
          $contactInformation: "mariovargasllosa@example.com",
          $books: ["6424ffa114483dd7b918b88f"]
          }

        } 
      */
};

const getAuthorbybook = async (req, res) => {
  // #swagger.tags = ['Authors']
  // #swagger.summary = 'Get an author by book'
  // #swagger.description = 'Endpoint to get an author by book'
  try {
    const author = await Author.find({ books: req.params.bookId });
    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

const getAllAuthors = async (req, res) => {
  // #swagger.tags = ['Authors']
  // #swagger.summary = 'Get all authors'
  // #swagger.description = 'Endpoint to get all authors'
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

const getAuthorById = async (req, res) => {
  // #swagger.tags = ['Authors']
  // #swagger.summary = 'Get an author by ID'
  // #swagger.description = 'Endpoint to get an author by ID'
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

const updateAuthorById = async (req, res) => {
  // #swagger.tags = ['Authors']
  // #swagger.summary = 'Update an author by ID'
  // #swagger.description = 'Endpoint to update an author by ID'
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      birthdate,
      nationality,
      biography,
      website,
      socialMediaLinks,
      contactInformation,
      books,
    } = req.body;
    const updates = {
      name,
      birthdate,
      nationality,
      biography,
      website,
      socialMediaLinks,
      contactInformation,
    };
    const options = { new: true };

    let author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }

    await Author.updateOne({ _id: req.params.id }, { $set: updates });

    if (books && books.length > 0) {
      const bookIds = await Book.find({ _id: { $in: books } }, "_id").lean();
      const foundBookIds = bookIds.map((book) => book._id);
      const notFoundBookIds = books.filter(
        (bookId) => !foundBookIds.includes(bookId)
      );

      if (notFoundBookIds.length > 0) {
        return res.status(404).json({
          msg: `The following book IDs were not found: ${notFoundBookIds.join(
            ", "
          )}`,
        });
      }

      await Author.updateOne(
        { _id: req.params.id },
        { $set: { books: foundBookIds } }
      );
    }

    author = await Author.findById(req.params.id);
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
/* #swagger.parameters['Author'] = {
          in: 'body',
          description: 'Author Information',
          required: true,
          schema: { 
          $name: "Mario Vargas Llosa",
          $birthdate: "1936-03-28",
          $nationality: "Peruvian",
          $biography: "Mario Vargas Llosa is a Nobel Prize-winning Peruvian writer and journalist.",
          $website: "https://www.mvargasllosa.com/",
          $socialMediaLinks: ["https://www.facebook.com/MarioVargasLlosa/","https://twitter.com/MVargasLlosa"],
          $contactInformation: "Lima, Peru",
          $books: ["5f9f1b9b9b9b9b9b9b9b9b9d", "5f9f1b9b9b9b9b9b9b9b9b9e", "5f9f1b9b9b9b9b9b9b9b9b9f"]
          }

        } 
      */
  
};

const deleteAuthorById = async (req, res) => {
  // #swagger.tags = ['Authors']
  // #swagger.description = 'Endpoint to delete an author by ID'
  //  #swagger.summary = 'Delete an author by ID'
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }

    res.json({ msg: "Author removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  getAuthorbybook,
  updateAuthorById,
  deleteAuthorById,
};
