const request = require("supertest");
const User = require("../models/User");
process.env.PORT = 8083;
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.JWT_TOKEN;

describe("GET /users", () => {
  test("responds with success for an authorized request", (done) => {
    request(app)
      .get("/users")
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

describe("GET /users/:id", () => {
    test("responds with success for an authorized request with a valid API KEY", (done) => {
      request(app)
        .get("/users/64277d1261a2dcbe71d4cc3b")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeDefined();
          expect(res.body.firstName).toBe("Alirio");
          expect(res.body.lastName).toBe("Mieres");
          done();
        });
    }, 50000);

    test('should return 404 if user not found', async () => {

              const id = '642843a38151b0a8d0c7f12f';
                const res = await request(app)
              .get(`/users/${id}`)
              .set('Authorization', `Bearer ${token}`);
              expect(res.status).toBe(404);
              expect(res.body.msg).toBe(`User not found`);
            });
  });

describe("PUT /users/:id", () => {
  test("responds with updated user data", (done) => {

    const userId = "64285cfece0b7ca84bb2cb69";

    const updateUserData = { firstName: "Thomas", lastName: "Monson" };

    request(app)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateUserData)
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }, 20000);
});

  describe('DELETE /users/:id', () => {
    test('should delete an author by ID', async () => {
      const user = new User({
        firstName: 'Jony',
        lastName: 'Doe',
        email: `johndoe${Math.random()}@gmail.com`,
        password: '123456',
        birthdate: '01/01/1970',
        role: 'USER_ROLE',
        phone: '1234567890',
        address: '123 Main St'
      });
      await user.save();

      const res = await request(app)
        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe('User deleted');
    });

    test('should return 400 if author not found', async () => {

      const id = '642843a38151b0a8d0c7f12f';
        const res = await request(app)
      .delete(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe(`User with ${id} not exists`);
    });
  });

describe("POST /users", () => {
  test("responds with created user data", (done) => {
    const newUserData = {
      firstName: "David",
      lastName: "Garcia",
      email: `davidgarcia${Math.random()}@gmail.com`,
      password: "123456",
      role: "USER_ROLE",
      phone: "1234567890",
      address: "123 Main St",
      birthday: "01/01/1970",
    };

    request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(newUserData)
      .expect("Content-Type", /json/)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty("firstName", "David");
        expect(res.body).toHaveProperty("lastName", "Garcia");
        expect(res.body).toHaveProperty("email", newUserData.email);
        expect(res.body).toHaveProperty("role", "USER_ROLE");
        expect(res.body).toHaveProperty("phone", "1234567890");
        expect(res.body).toHaveProperty("address", "123 Main St");
        expect(res.body).toHaveProperty("birthday", "01/01/1970");

        await done();
      });
  }, 50000);
});
