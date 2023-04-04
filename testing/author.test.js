const dotenv = require("dotenv");
dotenv.config();
const token = process.env.JWT_TOKEN;

const request = require("supertest");
const Author = require("../models/Author");
process.env.PORT = 8080;
const app = require("../app");

describe("GET /authors", () => {
  test("responds with success for an authorized request", (done) => {
    request(app)
      .get("/authors")
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


describe("GET /authors/:id", () => {
    test("responds with success for an authorized request with a valid API KEY", (done) => {
      request(app)
        .get("/authors/64277ea5664e29680be33d61") // replace 1 with the id of the author you want to retrieve
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeDefined();
          expect(res.body.name).toBe("Mario Vargas Llosa"); // replace name with the name of the author you expect to retrieve
          done();
        });
    }, 20000);
  });
  

  describe("PUT /authors/:id", () => {
    test("responds with updated author data", (done) => {
      const authorId = "64277ea5664e29680be33d61";
      const updatedAuthorData = { name: "Mario Vargas Llosa", biography: "New bio" };
  
      request(app)
        .put(`/authors/${authorId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedAuthorData)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res.body).toHaveProperty("name", "Mario Vargas Llosa");
          expect(res.body).toHaveProperty("biography", "New bio");
          expect(res.body).toHaveProperty("_id", authorId);
  
          done();
        });
    }, 20000);
  });

  describe('DELETE /authors/:id', () => {
    test('should delete an author by ID', async () => {
      const author = new Author({
        name: 'John Doe',
        biography: 'A famous author',
        nationality: 'American',
        birthdate: '01/01/1970'
      });
      await author.save();
  
      const res = await request(app)
        .delete(`/authors/${author._id}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('Author removed');
    });
  
    test('should return 404 if author not found', async () => {
      const res = await request(app)
      .delete('/authors/64277ea5664e29680be33e80')
      .set('Authorization', `Bearer ${token}`);
      console.log(res.body);
      expect(res.status).toBe(404);
      expect(res.body.msg).toBe('Author not found');
    });
  });
  
  describe("POST /authors", () => {
    test("responds with created author data", (done) => {
      const newAuthorData = {
        name: "Gabriel García Márquez2",
        birthdate: "1927-03-06",
        nationality: "Colombian",
        biography: "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist.",
        website: "https://gabrielgarciamarquez.com",
        socialMediaLinks: ["https://www.twitter.com/ggm"],
        contactInformation: "ggm@example.com",
        books: ["6424ffa114483dd7b918b88f"]
      };
  
      request(app)
        .post("/authors")
        .set("Authorization", `Bearer ${token}`)
        .send(newAuthorData)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res.body).toHaveProperty("name", "Gabriel García Márquez2");
          expect(res.body).toHaveProperty("birthdate", "1927-03-06T00:00:00.000Z");
          expect(res.body).toHaveProperty("nationality", "Colombian");
          expect(res.body).toHaveProperty("biography", "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist.");
          expect(res.body).toHaveProperty("website", "https://gabrielgarciamarquez.com");
          expect(res.body).toHaveProperty("socialMediaLinks", ["https://www.twitter.com/ggm"]);
          expect(res.body).toHaveProperty("contactInformation", "ggm@example.com");
          expect(res.body).toHaveProperty("books", ["6424ffa114483dd7b918b88f"]);
  
          done();
        });
    }, 20000);
  });
  
  
  describe("GET /authors/book/:bookId", () => {
    test("responds with success for an authorized request with a valid API KEY", (done) => {
      request(app)
        .get("/authors/book/6424ffa114483dd7b918b88f") // replace 123456789 with the bookId you want to retrieve the author for
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeDefined();
          expect(res.body[0].name).toBe("Mario Vargas Llosa"); // replace name with the name of the author you expect to retrieve
          done();
        });
    }, 20000);
  });
