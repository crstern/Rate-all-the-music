const router = require('express').Router();
const User = require('../models/user.model');
const {
  createNewUser,
  getAccessToken,
  getRefreshToken,
  getNewAccessToken,
  getCurrentUser
} = require('../service/user.service');
const {registeredUser} = require('../dto/user.dto')
const axios = require("axios");

router.post('/login', async (req, res) => {
  const data = req.body;
  try{
    const {accessToken, user} = await getAccessToken(data);
    const refreshToken = await getRefreshToken(user);

    res.json({
    data: {
      access_token: accessToken,
        refresh_token: refreshToken,
      "user": {
      username: user.username,
        id: user.id,
        admin: user.admin
    }
    }
  })
  }catch(e){
    res.status(e.status || 500)
    res.json({
      error: {
        message: e.message
      }
    })
  }
});

async function createNewProfile(data) {
  try {
    return await axios.post('http://flask-api:5000/api/auth/register', {
      username: data.username,
      email: data.email,
      id: data.id
    });
  }catch (e){
    console.log(e);
  }
}

router.post('/register', async (req, res) => {
  const data = req.body;
  try {
    const created = await createNewUser(data);
    await createNewProfile(created);
    res.json({
      status:200,
      data: registeredUser(created)
    })
  }catch (e){
    res.status(e.status || 500)
    res.json({
      error: {
        message: e.message
      }
    })
  }
})

router.get('/refresh_token', async (req, res) => {
  try {
    const newAccessToken = await getNewAccessToken(req);
    res.json({
      code: 'success',
      data: {
        'access_token': newAccessToken
      }
    });
  }catch (e){
    res.status(e.status || 500)
    res.json({
      error: {
        message: e.message
      }
    })
  }

});

router.get('/get_current_user', async (req, res) => {
  try {
    const user = await getCurrentUser(req)
    res.json({
      code: 'success',
      data: user
    })
  }catch (e){
    res.status(e.status || 500)
    res.json({
      error: {
        message: e.message
      }
    })
  }
})

module.exports = router;