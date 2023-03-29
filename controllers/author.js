const { validationResult } = require('express-validator');
const Author = require('../models/Author');

const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // #swagger.tags = ['Authors']
  // #swagger.description = 'Endpoint to create an author'
  try {
    const { name, birthdate, nationality, biography, website, socialMediaLinks, contactInformation, books } = req.body;
    const author = new Author({ name, birthdate, nationality, biography, website, socialMediaLinks, contactInformation, books });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }

 /* #swagger.parameters['Author'] = {
    in: 'body',
    description: 'Author Information',
    required: true,
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Mario Vargas Llosa' },
        birthdate: { type: 'string', format: 'date', example: '1936-03-28' },
        nationality: { type: 'string', example: 'Peruvian' },
        biography: { type: 'string', example: 'Lorem ipsum dolor sit amet' },
        website: { type: 'string', format: 'url', example: 'https://mariovargasllosa.net' },
        socialMediaLinks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Twitter' },
              url: { type: 'string', format: 'url', example: 'https://www.twitter.com/mariovargasllosa' }
            }
          },
          example: [
            {
              name: 'Twitter',
              url: 'https://www.twitter.com/mariovargasllosa'
            }
          ]
        },
        contactInformation: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Email' },
              value: { type: 'string', example: 'mariovargasllosa@example.com' }
            }
          },
          example: [
            {
              name: 'Email',
              value: 'mariovargasllosa@example.com'
            }
          ]
        }
      }
    }
  }
  
*/
};

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Internal server error
 */

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
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

  /* #swagger.tags = ['Authors']
     #swagger.summary = 'Update an author by ID'
     #swagger.description = 'Updates an existing author in the database.'
     #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the author to update',
        required: true,
        type: 'string'
     }
     #swagger.parameters['Author'] = {
  in: 'body',
  description: 'Author Information',
  required: true,
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Mario Vargas Llosa' },
      birthdate: { type: 'string', format: 'date', example: '1936-03-28' },
      nationality: { type: 'string', example: 'Peruvian' },
      biography: { type: 'string', example: 'Lorem ipsum dolor sit amet' },
      website: { type: 'string', format: 'url', example: 'https://mariovargasllosa.net' },
      socialMediaLinks: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Twitter' },
            url: { type: 'string', format: 'url', example: 'https://www.twitter.com/mariovargasllosa' }
          }
        },
        example: [
          {
            name: 'Twitter',
            url: 'https://www.twitter.com/mariovargasllosa'
          }
        ]
      },
      contactInformation: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Email' },
            value: { type: 'string', example: 'mariovargasllosa@example.com' }
          }
        },
        example: [
          {
            name: 'Email',
            value: 'mariovargasllosa@example.com'
          }
        ]
      }
    }
  }
}

      } */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, birthdate, nationality, biography, website, socialMediaLinks, contactInformation, books } = req.body;
    const updates = { name, birthdate, nationality, biography, website, socialMediaLinks, contactInformation };
    const options = { new: true };

    let author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: 'Author not found' });
    }

    await Author.updateOne({ _id: req.params.id }, { $set: updates });

    if (books && books.length > 0) {
      const bookIds = await Book.find({ _id: { $in: books } }, '_id').lean();
      await Author.updateOne({ _id: req.params.id }, { $set: { books: bookIds.map(book => book._id) } });
    }

    author = await Author.findById(req.params.id);
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     description: Delete an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the author to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Author removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: 'Author removed'
 *       '404':
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: 'Author not found'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Server error'
 */


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
}
