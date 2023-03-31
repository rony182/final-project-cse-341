const Router = require("express");
const { login } = require("../controllers/auth");
const validateLogin = require("../helpers/auth");

const authRouter = Router();

authRouter.post("/login", validateLogin, login);

module.exports = authRouter;
