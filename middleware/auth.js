const  jwt = require('jsonwebtoken')


module.exports.checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from headers
      token = authorization.split(' ')[1]
      const { data } = jwt.verify(token, process.env.SECRETKEY)
      req.info = data
      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ status: false, message: "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

