const router = require('express').Router()
const { tokenRequired, checkAdmin } = require('../service/user.service');
const { uploadArtists } = require('../service/upload.service')


router.post('/', tokenRequired, async(req, res) => {
  console.log('uploading')
  await uploadArtists();
  res.json({
    code: 'success',
    data: 'da'
  });
});

module.exports = router;