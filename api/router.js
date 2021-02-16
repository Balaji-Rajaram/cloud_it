const router = require('express').Router()

const user = require('./user/index') 
router.use('/user',user)

const template = require('./cftTemplate/index')
router.use('/template',template)


const stack = require('./stack/index')
router.use('/stack',stack)


const cloudFormation = require('./cloudFormation/index')
router.use('/cloudFormation',cloudFormation)


const detector = require('./detector/index')
router.use('/detector',detector)

module.exports = router