import { ApplicationController } from './'
export class UsersController extends ApplicationController {
  constructor() {
    super('User')
  }
  list(req, res) {
    return super._list(req, res)
  }
  update(req, res) {
    req.checkParams('id', 'Invalid Id.').isUUID('all')
    req.condition = { where: { id: req.params.id } }
    req.pick = ['email', 'name', 'avatar', 'password']
    return super._updateOne(req, res, data => {
      const result = data.dataValues
      delete result.password
      delete result.resetTokenSentAt
      delete result.resetToken
      delete result.resetTokenExpireAt
      return res.status(201).send({ success: true, data: result,  message: 'Update successfully' })
    })
  }
}
