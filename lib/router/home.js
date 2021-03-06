'use strict'

const Router = require('koa-router')
const getRefs = require('./helpers/getRefs')
const getMetadata = require('./helpers/getMetadata')

const router = module.exports = new Router()

router.get('/', async function (ctx) {
  ctx.redirected = true
  ctx.redirect(`/${ctx.state.locale}`)
})

router.get('/:locale',
  async function (ctx, next) {
    if (ctx.view) return next()
    ctx.view = 'home'
    const options = { lang: ctx.state.lang }
    const doc = await ctx.prismic.getSingle('home', options)
    ctx.assert(doc, 500, 'Content missing')
    ctx.state.pages.items.push(doc)
    ctx.state.title = doc.data.title[0].text
    ctx.state.params = []

    await getRefs(doc.data, ctx)
    await getMetadata(doc, ctx, next)
    await next()
  }
)
