const bcrypt = require('bcrypt')

const db = require('../models')

const { User } = db

const userController = {
  login: (req, res) => {
    res.render('login')
  },

  handleLogin: (req, res, next) => {
    // 這邊驗證密碼 username 跟 password 有沒有成對
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '錯誤的帳號或密碼')
        return next()
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '錯誤的帳號或密碼')
          return next()
        }
        req.session.username = user.username
        res.redirect('/')
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },

  logout: (req, res) => {
    req.session.username = null
    res.redirect('/')
  }
}

module.exports = userController
