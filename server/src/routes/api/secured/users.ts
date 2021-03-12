import { Router, Request, Response, response } from 'express'
import { isEmpty } from 'lodash'
import bcrypt from 'bcryptjs'
import { error, success } from '../../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../../core/constants/api'
import User from '@/core/db/models/User'

const api = Router()

 api.use('/:uuid', (req,_, next)=> {
   const { uuid } = req.params
   if (uuid != req.user?.uuid){
    throw new Error("Your are not authorized")
  }
  next()
})

api.get('/:uuid', async (req: Request, res: Response) => {
  const { uuid } = req.params
  try {

    const user: User | undefined = await User.findOne(uuid, { relations: ['buckets'] })

    if (user) {
      res.status(CREATED.status).json(success(user))
    }
    else {
      res.status(BAD_REQUEST.status).json({ 'err': 'user inexistant' })
    }
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.put('/:uuid/', async (req: Request, res: Response) => {

  const fields = ['firstname', 'lastname', 'nickname']
  try {
    const { uuid } = req.params

    const missings = fields.filter((field: string) => !req.body[field])
    if (!isEmpty(missings)) {
      const isPlural = missings.length > 1
      throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
    }

    const { firstname, lastname, nickname } = req.body
    const user: User | undefined = await User.findOne(uuid)

    if (user) {
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, User.SALT_ROUND)
      }

      user.firstname = firstname
      user.lastname = lastname
      user.nickname = nickname

      await user.save()
      res.status(OK.status).json(success(user))
    }
    else {
      res.status(BAD_REQUEST.status).json({ 'err': 'user inexistant' })
    }

  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})

api.delete('/:uuid', async (req: Request, res: Response) => {
  const { uuid } = req.params
  try {
    const user: User | undefined = await User.findOne(uuid)

    if (user) {
      await user.remove()
      res.status(OK.status).json(success(user))
    }
    else {
      res.status(BAD_REQUEST.status).json({ 'err': 'user inexistant' })
    }
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
  }
})


export default api
