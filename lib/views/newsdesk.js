const html = require('nanohtml')
const Section = require('../components/section')
const Header = require('../components/header')
const Footer = require('../components/footer')
const ContactInfo = require('../components/contact_info')
const { getLocales } = require('../locale')
const Newsdesk = require('../components/newsdesk')

module.exports = function newsdesk (state, ctx) {
  var doc = state.pages.items.find(doc => doc.type === 'newsdesk')
  return html`
    <body>
      <div class="Page">
      ${Section(Header(state.navDocument, state.ui.header, getLocales()))}
      ${Section(Newsdesk(doc.data.subdomain))}
      ${ContactInfo(state.linkedDocuments.contact_info_ref, ctx)}
      ${Footer(state.linkedDocuments.footer_ref, ctx)}
      </div>
    </body>
  `
}
