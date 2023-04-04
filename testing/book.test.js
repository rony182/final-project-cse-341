const request = require("supertest");
process.env.PORT = 8081;
const app = require("../app");
const ObjectId = require("mongodb").ObjectId;
const Book = require('../models/Book')
beforeAll(async () => {
  // log in and retrieve token
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '$ecretPassword' });

  token = response.body.token; // set token to response body
}, 50000);

describe('GET /books' ,() => {
    test('Responds successfully to an authorized request', (done) => {
        request(app)
        .get('/books')
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toBeDefined();
            expect(Array.isArray(res.body)).toBe(true);
            done();
      });
  }, 20000);
});

describe('GET /books/id', () => {
    test('Responds successfully to an authorized request', (done) => {
        request(app)
        .get('/books/642b56ac75a47b0daa405444')
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toBeDefined();
            expect(res.body.title).toBe('Narnia')
            expect(res.body.pages).toBe(999)
            done();
        });
        
    }, 20000);
});

describe("PUT /books/:id", () => {
    test("responds with updated user data", (done) => {
  
      const userId = "6424ffb814483dd7b918b893";
  
      const updateUserData = { pages: 888};
  
      request(app)
        .put(`/books/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateUserData)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }, 20000);
  });

  describe("POST /books", () => {
    test("responds with created book", (done) => {
      const book = {
        title : "Narnia",
        pages: 999,
        author : '6424fb69f1d71266471bf71b',
        datePublished : '1970-02-15',
        publisher : 'Chronicles'

      };
  
      request(app)
        .post("/books")
        .set("Authorization", `Bearer ${token}`)
        .send(book)
        .expect("Content-Type", /json/)
        .expect(201)
        .end(async (err, res) => {
          if (err) return done(err);
  
          expect(res.body).toHaveProperty("title", "Narnia");
          expect(res.body).toHaveProperty("pages", 999);
          expect(res.body).toHaveProperty("author", '6424fb69f1d71266471bf71b');
          expect(res.body).toHaveProperty("datePublished", "1970-02-15T00:00:00.000Z");
          expect(res.body).toHaveProperty("publisher", "Chronicles");
          await done();
        });
    }, 50000);
  });

describe('DELETE /users/:id', () => {
    test('should delete a book by ID', async () => {
      const book = new Book({
        title: 'Harry Potter',
        pages: 987,
        author : '6424fb69f1d71266471bf71b',
        datePublished : '1990-02-21',
        publisher : "Hogwarts Publisher"
      });
      await book.save();

      const res = await request(app)
        .delete(`/books/${book._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(204);
    });
  });