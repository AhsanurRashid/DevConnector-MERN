const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

//@router   POST api/users
//@desc     Register user
//@access   Public
router.post(
  '/',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should me more than 6').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      //See if the user exists
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pq',
        d: 'mm',
      })

      user = new User({
        name,
        email,
        avatar,
        password,
      })

      //Encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      //Return jsonwebtoken

      res.send('User Registered')
    } catch (err) {
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
