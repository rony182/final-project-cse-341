const { validationResult } = require('express-validator');
const Author = require('../models/Author');

const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, birthdate, nationality, biography, website, socialMediaLinks, contactInformation } = req.body;
    const author = new Author({ name, birthdate, nationality, biography, website, socialMediaLinks, contactInformation });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateAuthorById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, birthdate, nationality, biography, website, socialMediaLinks, contactInformation } = req.body;
    let author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: 'Author not found' });
    }

    author.name = name;
    author.birthdate = birthdate;
    author.nationality = nationality;
    author.biography = biography;
    author.website = website;
    author.socialMediaLinks = socialMediaLinks;
    author.contactInformation = contactInformation;

    await author.save();
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: 'Author not found' });
    }

    await author.remove();
    res.json({ msg: 'Author removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
