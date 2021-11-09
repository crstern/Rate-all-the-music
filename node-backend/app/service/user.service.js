const sha256 = require('js-sha256').sha256;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.model');

dotenv.config();

const createNewUser = async (data) => {
  data['hashedPassword'] = sha256(data.password)
  delete data.password;
  try{
    const newUser = User.build(data);
    await newUser.save();
    return newUser;
  }
  catch (e) {
    e.status = 422;
    e.message = "Couldn't save the user";
    throw e;
  }
}

const getAccessToken = async (data) => {
  const user = await User.findOne({
    where: {
      username: data.username
  }});

  if (!user || !checkPassword(user.hashedPassword, data.password)){
    throw {
      status: 422,
      message: "invalid credentials"
    }
  }
  const accessToken = await jwt.sign({
    id: user.id,
  }, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
  return {accessToken, user}
}

const getNewAccessToken = async (req) => {
  if(!'x-refresh-token' in req.headers){
    throw {
      status: 403,
      message: "Refresh token is missing"
    }
  }

  const refreshToken = req.headers['x-refresh-token']

  if (refreshToken === null){
    throw {
      status: 403,
      message: "Refresh token is missing"
    }  }

  const data = await jwt.decode(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findByPk(data.id);
  return await jwt.sign({
    id: user.id,
  }, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}

const getCurrentUser = async (req) => {
  if(!'x-access-token' in req.headers){
    throw {
      status: 403,
      message: "Refresh token is missing"
    }
  }
  const accessToken = req.headers['x-access-token']
  try{
    const data = await jwt.verify(accessToken, process.env.TOKEN_SECRET);

    const user = await User.findByPk(data.id);
    return user;
  }catch (e){
    throw {
      status: 403,
      message: "Invalid token"
    }
  }
}

const getRefreshToken = async (user) => {
  return await jwt.sign({
    id: user.id
  }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '365d'})
}

const checkPassword = (actualPassword, providedPassword) => {
  return actualPassword === sha256(providedPassword);
}

const checkAdmin = async (req, res, next) => {
  const accessToken = req.header('x-access-token')
  try{
    const data = await jwt.verify(accessToken, process.env.TOKEN_SECRET);
    const user = await User.findByPk(data.id);
    if (!user.admin) res.status(400).send('Unauthorized')
  }catch (e){
    res.status(400).send('Unauthorized')
  }

}

const tokenRequired = async (req, res, next) => {
  const accessToken = req.header('x-access-token');

  if (!accessToken) return res.status(401).send('access denied')
  try{
    req.user = await jwt.verify(accessToken, process.env.TOKEN_SECRET);
    next();
  }
  catch (e){
    res.status(400).send('Invalid token')
  }
}

module.exports = {
  createNewUser,
  getAccessToken,
  getRefreshToken,
  getNewAccessToken,
  getCurrentUser,
  checkAdmin,
  tokenRequired,
};