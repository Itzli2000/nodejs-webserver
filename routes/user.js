const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
} = require("../controllers/user");
const { isValidRole } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", userGet);

router.put("/", (_, res) => {
  res.status(404).json({ message: "Not valid api route" });
});

router.put("/:id", userPut);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("name", "Names is required").notEmpty(),
    check("password", "Password is required and over 6 characters").isLength({
      min: 6,
    }),
    check("role").custom(isValidRole),
    validateFields,
  ],
  userPost
);

router.patch("/", userPatch);

router.delete("/", userDelete);

module.exports = router;
