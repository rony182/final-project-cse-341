const request = require("supertest");
const app = require("../app");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDI0ZjdlMDc1ODgzYjM2NGJkMmFkZmQiLCJpYXQiOjE2ODAyMzEzNjEsImV4cCI6MTY4MDI0NTc2MX0.GZWe7LQkjJxXnRcgJbTg9wVI0euN1f0tIzDEu-Jst3M";

describe("GET /authors", () => {
  test("No token in the request", (done) => {
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
        .get("/authors/6424fb69f1d71266471bf71b") // replace 1 with the id of the author you want to retrieve
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeDefined();
          expect(res.body.name).toBe("J.K. Rowling"); // replace name with the name of the author you expect to retrieve
          done();
        });
    }, 20000);
  });

  describe("PUT /authors/:id", () => {
    test("responds with updated author data", (done) => {
      const authorId = "6424fb69f1d71266471bf71b";
      const updatedAuthorData = { name: "J.K. Rowling", biography: "New bio" };
      const token = "valid_jwt_token";
  
      request(app)
        .put(`/authors/${authorId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedAuthorData)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res.body).toHaveProperty("name", "J.K. Rowling");
          expect(res.body).toHaveProperty("biography", "New bio");
          expect(res.body).toHaveProperty("_id", authorId);
  
          done();
        });
    });
  });
  
  
