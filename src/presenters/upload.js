const publicFile = 'public/import/'
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const { promisify } = require('util')
const crypto = require('crypto')

const removeFile = promisify(fs.unlink)

const storage = multer.diskStorage({
  destination: publicFile,
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const upload = multer({ storage: storage })

const uploadRemove = (file) => {
  const locate = path.join(__dirname, '../../', publicFile) + file
  return removeFile(locate)
}

module.exports = {
  uploadImage: upload,
  uploadRemove: uploadRemove
}