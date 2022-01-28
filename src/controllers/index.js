const { uploadAws }  = require('../presenters/aws')

exports.upload = async (req, res) => {
    try {
        console.log('req.file', req.file)
        const data = await uploadAws(req.file)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ erros: [{  title: 'Error', message: error.message }] })
    }
}