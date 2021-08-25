const _ = require('lodash')
import db from '../models/'
let model = ''
class ApplicationController {
  errors: any
  constructor(m) {
    model = m
  }
  _create(req, res, options = {}, callback = null) {
    req.getValidationResult()
      .then(result => {
        if (result.isEmpty()) {
          req.body = _.pick(_.cloneDeep(req.body), req.pick || [])
          return db[model].create(req.body)
            .then(appuser => res.status(201).send({ success: true, data: appuser, message: options['message'] || 'Successfully Created' }))
            .catch(error => res.boom.badRequest(error))
        } else {
          res.boom.badRequest('Validation errors', result.mapped())
        }
      })
  }
  _list(req, res, options = {}, callback = null) {
    return db[model].findAll({ include: [{ all: true }] }).then(data =>
      res.status(200).send({ success: true, data: data }))
      .catch(error => res.boom.badRequest(error))
  }
  _findOne(req, res, callback = null) {
    req.getValidationResult().then(result => {
      if (result.isEmpty()) {
        db[model].findOne(req.condition || {})
          .then(data => {
            if (typeof (callback) === 'function')
              callback(data)
            else
              res.status(200).send(data)
          })
          .catch(error => res.boom.badRequest(error))
      } else {
        res.boom.badRequest('Validation errors', result.mapped())
      }
    })
  }


  _updateOne(req, res, callback = null) {
    req.body = _.pick(_.cloneDeep(req.body), req.pick || [])
    req.getValidationResult()
      .then(result => {
        if (result.isEmpty()) {
          db[model].update(req.body, req.condition || {})
            .then(updated => {
              db[model].findOne(req.condition || {})
                .then(data => {
                  if (typeof (callback) === 'function')
                    callback(data)
                  else
                    return res.status(200).send(data)
                })
                .catch(error => res.boom.badRequest(error))
            })
        }
        else
          res.boom.badRequest('Validation errors', result.mapped())
      })
      .catch(error => res.boom.badRequest(error))
  }

  private isCallback(cb) {
    return typeof (cb) === 'function'
  }
  private model() {
    return db[model]
  }
}

export default ApplicationController
