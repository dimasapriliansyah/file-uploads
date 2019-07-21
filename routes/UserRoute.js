const UserRoute = require('express').Router()
const { checkSchema } = require('express-validator')

const UserController = require('../controllers/UserController')
const UserValidationSchema = require('../middlewares/validation/UserSchema')

const isRequestBodyEmpty = require('../middlewares/isRequestBodyEmpty')
const allowedMethod = require('../middlewares/allowedRequestMethod')
const authentication = require("../middlewares/authentication")

UserRoute.use(allowedMethod(["GET", "POST", "PUT"]))

UserRoute.get("/me", authentication, UserController.infoUser);

UserRoute.post("/login", isRequestBodyEmpty, checkSchema(UserValidationSchema.onLogin), UserController.loginUser)

UserRoute.post("/register", isRequestBodyEmpty, checkSchema(UserValidationSchema.onCreate), UserController.createUser)

UserRoute.put("/update/:id", authentication, isRequestBodyEmpty, checkSchema(UserValidationSchema.onUpdate), UserController.updateUser)


module.exports = UserRoute