var html = require('nanohtml')
var Section = require('../components/section')
var Header = require('../components/header')
var { asText } = require('prismic-richtext')

module.exports = function home (state) {
  var doc = state.pages.items.find(doc => doc.type === 'startsida')
  return html`
    <div class="Page">
      ${Section({
        body: Header(false)
      })}
      ${Section({
        body: html`
          <h1>${asText(doc.data.title)}</h1>
        `
      })}
    </div>
  `
}