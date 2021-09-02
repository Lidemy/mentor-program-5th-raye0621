const db = require('../models')

const { Comment } = db
const { User } = db

const commentController = {
  index: (req, res) => {
    Comment.findAll({
      where: {
        is_deleted: 0
      },
      order: [
        ['id', 'DESC']
      ],
      include: User
    }).then((comments) => {
      res.render('index', {
        comments
      })
    })
  },

  fullPost: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then((comment) => {
      res.render('blog', {
        comment
      })
    })
  },

  update: (req, res) => {
    if (!req.session.username) return res.redirect('/')
    Comment.findOne({
      where: {
        id: req.params.id,
        UserName: req.session.username
      }
    }).then((comment) => {
      res.render('update_blog', {
        comment
      })
    })
  },

  handleUpdate: (req, res, next) => {
    if (!req.session.username) return res.redirect('/')
    const { id } = req.params
    const { title, content } = req.body
    if (!title || !content) {
      req.flash('errorMessage', '欄位不得為空')
      return next()
    }
    Comment.findOne({
      where: {
        id
      }
    }).then((comment) => comment.update({
      title,
      content
    })).then(() => {
      res.redirect('/')
    }).catch(() => {
      console.log('something wrong')
      res.redirect('/')
    })
  },

  admin: (req, res) => {
    if (!req.session.username) return res.redirect('/')
    Comment.findAll({
      where: {
        is_deleted: 0
      },
      order: [
        ['id', 'DESC']
      ]
    }).then((comments) => {
      res.render('admin', {
        comments
      })
    })
  },

  add: (req, res) => {
    if (!req.session.username) return res.redirect('/')
    res.render('add_blog')
  },

  handleAdd: (req, res, next) => {
    const { title, content } = req.body
    const { username } = req.session
    if (!username) return res.redirect('/')

    if (!title || !content) {
      req.flash('errorMessage', '內容不得為空呦')
      return next()
    }
    Comment.create({
      UserName: username,
      title,
      content
    }).then(() => {
      res.redirect('/')
    }).catch((err) => {
      console.log('err', err)
      res.redirect('/')
    })
  },

  handleDelete: (req, res) => {
    const { username } = req.session
    const { id } = req.params
    if (!username) return res.redirect('/')
    Comment.findOne({
      where: {
        id
      }
    }).then((comment) => comment.update({
      is_deleted: 1
    })).then(() => {
      res.redirect('/admin')
    }).catch((err) => {
      console.log('something wrong')
      res.redirect('/')
    })
  }
}

module.exports = commentController
