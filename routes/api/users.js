const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

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
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    res.send('User route')
  }
)

module.exports = router
