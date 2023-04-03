const request = require("supertest");
process.env.PORT = 8082;
const app = require("../app");
const Review = require("../models/Review");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDI0ZjdlMDc1ODgzYjM2NGJkMmFkZmQiLCJpYXQiOjE2ODA1NDg0MTAsImV4cCI6MTY4MDU2MjgxMH0.J57lk8pdSoQ9FOsAaoEy4dwa6DcxYy1J4YkVchpoDy0";

describe("GET /reviews", () => {
  test("responds with success for an authorized request", (done) => {
    request(app)
      .get("/reviews")
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

describe("GET /reviews/:id", () => {
    test("responds with success for an authorized request with a valid API KEY", (done) => {
      request(app)
        .get("/reviews/642504ee30fee94eb9103494")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeDefined();
          expect(res.body.bookId).toBe("6424ffa114483dd7b918b88f");
          expect(res.body.date).toBe("2023-03-30T03:41:34.095Z");
          done();
        });
    }, 50000);

    test('should return 404 if user not found', async () => {

              const id = '642843a38151b0a8d0c7f12f';
                const res = await request(app)
              .get(`/reviews/${id}`)
              .set('Authorization', `Bearer ${token}`);
              expect(res.status).toBe(404);
              expect(res.body.error).toBe(`Review not found`);
            });
  });

// describe("PUT /reviews/:id", () => {
//   test("responds with updated reviews data", (done) => {

//     const reviewId = "642504ee30fee94eb9103494";

//     const updateReviewData = { 
//         "rating": "10",
//         "comment": "Lorem Ipsum",
//         "date": "2023-03-30T03:41:34.095Z",
//     };

//     request(app)
//       .put(`/reviews/${reviewId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(updateReviewData)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
        
//         expect(res.body).toHaveProperty("comment", "Lorem Ipsum");
//         expect(res.body).toHaveProperty("date", "2023-03-30T03:41:34.095Z");
//         expect(res.body).toHaveProperty("rating", 10);
//         done();
//       });
//   }, 20000);
// });

  describe('DELETE /reviews/:id', () => {
    test('should delete an author by ID', async () => {

      const review = new Review({
        userId: "5f9f5b5b5b5b5b5b5b5b5b5b",
        bookId: "5f9f5b5b5b5b5b5b5b5b5b5b",
        comment: "Lorem Ipsum",
        rating: "9"
      });
      await review.save();

      const res = await request(app)
        .delete(`/reviews/${review._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Review deleted');
    });

    test('should return 400 if review not found', async () => {

      const id = '642843a38151b0a8d0c7f12a';
        const res = await request(app)
      .delete(`/reviews/${id}`)
      .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(404);
      expect(res.body.error).toBe(`Review not found`);
    });
  }, 20000);

describe("POST /reviews", () => {
  test("responds with created revies data", (done) => {
    const review = {
        userId: "5f9f5b5b5b5b5b5b5b5b5b5b",
        bookId: "5f9f5b5b5b5b5b5b5b5b5b5b",
        comment: "Lorem Ipsum",
        rating: "9"
      };

    request(app)
      .post("/reviews")
      .set("Authorization", `Bearer ${token}`)
      .send(review)
      .expect("Content-Type", /json/)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty("userId", "5f9f5b5b5b5b5b5b5b5b5b5b");
        expect(res.body).toHaveProperty("bookId", "5f9f5b5b5b5b5b5b5b5b5b5b");
        expect(res.body).toHaveProperty("comment", "Lorem Ipsum");
        expect(res.body).toHaveProperty("rating", 9);

        await done();
      });
  }, 50000);
});


describe("GET /reviews/user/:userId", () => {
    test("responds with success for an authorized request with a valid API KEY", (done) => {
      request(app)
        .get("/reviews/user/6424f75275883b364bd2adf8")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeDefined();
          expect(res.body[0]._id).toBe("642504ee30fee94eb9103494");
          expect(res.body[0].date).toBe("2023-03-30T03:41:34.095Z");
          done();
        });
    }, 50000);

    test('should return 404 if user not found', async () => {

            const res = await request(app)
              .get(`/reviews/users/642843a38151b0a8d0c7f12a`)
              .set('Authorization', `Bearer ${token}`);
              expect(res.status).toBe(404);
            });
  }, 50000);

  describe("GET /reviews/book/:bookId", () => {
    test("responds with success for an authorized request with a valid API KEY", (done) => {
      request(app)
        .get("/reviews/book/5f9f5b5b5b5b5b5b5b5b5b5b")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeDefined();
          expect(res.body[0]._id).toBe("642b262d6e10769f2f8ef615");
          expect(res.body[0].date).toBe("2023-04-03T19:17:01.437Z");
          done();
        });
    }, 50000);

    test('should return 404 if reviews not founds', async () => {

            const res = await request(app)
              .get(`/reviews/books/5f9f5b5b5b5b5b5b5b5b5b5a`)
              .set('Authorization', `Bearer ${token}`);
              expect(res.status).toBe(404);
            });
  }, 50000);