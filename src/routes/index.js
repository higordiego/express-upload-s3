
const { uploadImage } = require('../presenters/upload')
const { upload } = require('../controllers')

module.exports = app => {
    app.post('/upload', uploadImage.single('upload'), upload)
}