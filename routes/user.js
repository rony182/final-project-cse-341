const Router = require("express");
const userRouter = Router();

const {
  createUser,
  deleteUser,
  findAll,
  findOne,
  updateUser,
} = require("../controllers/user");
const {
  createUserValidation,
  deleteUserValidation,
  findOneValidation,
  updateUserValidation,
} = require("../helpers/user");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-roles");

userRouter.get("/", [validateJWT, isAdminRole, validateFields], findAll);
userRouter.get("/:id", findOneValidation, findOne);
userRouter.post("/", createUserValidation, createUser);
userRouter.put("/:id", updateUserValidation, updateUser);
userRouter.delete("/:id", deleteUserValidation, deleteUser);

module.exports = userRouter;
