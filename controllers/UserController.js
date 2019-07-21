const { validationResult } = require('express-validator')
const httpResponse = require('../libs/httpResponse');
const UserModel = require('../models/UserModel');
const consoleLogger = require('../libs/consoleLogger');

const createUser = async (req, res, next) => {
  try {

    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      return res.status(422).json(httpResponse(false, "Unable to process data.", validationError.array()))
    }

    const { username, password, tenant, pic, email } = req.body

    const createdData = await UserModel.create({ username, password, tenant, pic, email })


    return res.status(201).json(httpResponse(true, "User created.", { 
      id: createdData.id, 
      username: createdData.username, 
      tenant: createdData.tenant, 
      bucket: createdData.bucket, 
      pic: createdData.pic, 
      email: createdData.email 
    }))

  } catch (error) {

    let message = error.message || null

    if (error.errors !== undefined) {
      message = error.errors[0].message;
    }

    consoleLogger("error", error, "controllers/UserController", "createUser")
    return res.status(422).json(httpResponse(false, "Unable to process data.", message))
  }

}

const updateUser = async (req, res, next) => {
  try {

    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      return res.status(422).json(httpResponse(false, "Unable to process data.", validationError.array()))
    }

    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["username", "password", "email", "tenant", "pic"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
      return res.status(422).json(httpResponse(false, "Invalid operation.", { allowedUpdates }))
    }

    const userData = await UserModel.findByPk(id);


    if (!userData) {
      return res.status(422).json(httpResponse(false, "User id not found", id))
    }

    let dataToUpdate = {};

    updates.forEach(key => {
      dataToUpdate[key] = req.body[key]
    })

    const updatedData = await userData.update(dataToUpdate)

    return res.status(201).json(httpResponse(true, "User updated.", updatedData))

  } catch (error) {

    let message = error.message || null

    if (error.errors !== undefined) {
      message = error.errors[0].message;
    }
    consoleLogger("error", error, "controllers/UserController", "updateUser")
    return res.status(422).json(httpResponse(false, "Unable to process data.", message))
  }
}

const loginUser = async (req, res, next) => {
  try {

    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      return res.status(422).json(httpResponse(false, "Unable to process data.", validationError.array()))
    }

    const { username, password } = req.body;

    const userData = await UserModel.findUserByCredentials({ username, password });

    if (!userData) {
      return res.status(401).json(httpResponse(false, "Wrong username/password.", { username }))
    }

    const token = await userData.generateAuthToken();


    return res.status(200).json(httpResponse(true, "Login success.", token))

  } catch (error) {
  

    let message = error.message || null

    if (error.errors !== undefined) {
      message = error.errors[0].message;
    }

    consoleLogger("error", error, "controllers/UserController", "loginUser")
    return res.status(422).json(httpResponse(false, "Unable to process data.", message))
  }

}

const infoUser = (req, res, next) => {
  const userInfo = req.user
  return res.status(200).json(httpResponse(true, null, userInfo))
}


module.exports = { createUser, updateUser, loginUser, infoUser }