import { Express, Request, Response } from 'express'
import * as apiRoutes from './api.routes'
import * as adminRoutes from './admin.routes'
import * as express from 'express'
const multer = require('multer')
const path = require('path')

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/files',
  filename: function (req, file, fn) {
    fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
  }
})

const validateFile = function (file, cb) {
  const allowedFileTypes = /jpeg|jpg|png|gif/
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = allowedFileTypes.test(file.mimetype)

  if (extension && mimeType) {
    return cb(null, true)
  } else {
    cb('Invalid file type.')
  }
}


const upload = multer({
  storage: storageEngine,
  fileFilter: function (req, file, callback) {
    validateFile(file, callback)
  }
})

export function initRoutes(app: Express) {
  app.use('/api/v1', apiRoutes.initRoutes(app, express.Router()))
  app.use('/admin', adminRoutes.initRoutes(app, express.Router()))
  app.post('/upload/avatar', upload.single('avatar'), async (req: any, res) => {
    try {
      res.send({ url: 'files/' + req.file.filename })
    } catch (err) {
      res.sendStatus(400)
    }
  })
  app.use('*/files', express.static('public/files'))
  app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to IMFO world' }))
  app.all('*', (req: Request, res: Response) => res.boom.notFound())
}
