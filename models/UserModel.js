const { sequelize, Sequelize } = require("../connection/database")
const { Model } = Sequelize
const consoleLogger = require("../libs/consoleLogger")
const bcrypt = require('bcryptjs')
const generateToken = require('../libs/generateJWTPromise');

class User extends Model {

  static async findUserByCredentials(where) {
    try {
      const { username, password } = where
      const userData = await this.findOne({ where: { username }, attributes: ['id', 'username', 'tenant', 'pic', 'bucket', 'password'] })

      if (!userData) {
        consoleLogger("error", "username not found", "UserModel", "findUserByCredentials")
        return false;
      }

      const isValidPassword = await bcrypt.compare(password, userData.password)

      if (!isValidPassword) {
        consoleLogger("error", "password unmatch", "UserModel", "findUserByCredentials")
        return false;
      }

      return userData;

    } catch (error) {
      consoleLogger("error", error, "UserModel", "findUserByCredentials")
      throw new Error(error);
    }
  }

  async generateAuthToken() {
    try {
      const user = this

      const token = await generateToken({ id: user.id, username: user.username, tenant: user.tenant, pic: user.pic, bucket: user.bucket })

      return token;

    } catch (error) {
      consoleLogger("error", error.message, "UserModel", "generateAuthToken")
      throw new Error(error.message);
    }
  }
}

User.init({
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  username: { type: Sequelize.STRING(20), allowNull: false, unique: { msg: "Username already exists." } },
  password: { type: Sequelize.STRING(100), allowNull: false },
  tenant: { type: Sequelize.STRING(50), allowNull: false, unique: { msg: "Tenant already exists." } },
  bucket: { type: Sequelize.STRING(50) },
  pic: { type: Sequelize.STRING(50), allowNull: false },
  email: { type: Sequelize.STRING(30), allowNull: false }
},
  {
    hooks: {
      beforeCreate: async (user, options) => {
        try {

          const password = await bcrypt.hash(user.password, 8)
          user.password = password

          const tenant = user.tenant

          const bucket = tenant.replace(" ", "").toLowerCase()
          user.bucket = bucket

        } catch (error) {
          consoleLogger("error", error, "UserModel", "hooks:beforeCreate")
          throw new Error(error)
        }
      },
      beforeUpdate: async (user, options) => {
        try {

          if (user.changed("password")) {

            const password = await bcrypt.hash(user.password, 8)

            user.password = password

          }

          if (user.changed("tenant")) {
            const tenant = user.tenant

            const bucket = tenant.replace(" ", "").toLowerCase()
            user.bucket = bucket
          }

        } catch (error) {
          consoleLogger("error", error, "UserModel", "hooks:beforeUpdate")
          throw new Error(error)
        }

      }
    }, sequelize, modelName: 'user'
  })


module.exports = User