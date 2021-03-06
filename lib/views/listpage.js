const html = require('nanohtml')
const { getLocales } = require('../locale')
const {linkResolver} = require('../resolve')
const serializer = require('../components/text/serializer')
const asElement = require('prismic-element')
const Section = require('../components/section')
const Header = require('../components/header')
const ContactInfo = require('../components/contact_info')
const Footer = require('../components/footer')
const Worklist = require('../components/worklist')
const Filter = require('../components/filter')
const Subnavigation = require('../components/subnavigation')
const Quote = require('../components/quote')

module.exports = function listpage (state, ctx) {
  var uid = state.uid
  var docType = state.docType

  var doc = state.pages.items.find(doc => doc.type === 'listpage' && doc.uid === uid)
  var documents = state[`${docType}s`]
  var workFilter = state.ui.workFilter

  var listView
  switch (docType) {
    case 'book':
    case 'movie':
      listView = function listOfWorks () {
        return Section(Worklist({
          documents,
          docType: state.docType,
          viewBy: workFilter.viewBy,
          emptyView: workFilter.empty
        }))
      }
      break
    case 'quote':
      listView = function listOfQuotes () {
        return Section({
          push: true,
          body: documents.map(function renderQuote (quote) {
            return html`
              <div class="u-sm-marginT u-md-marginT u-lg-marginT">
                ${Quote(quote.data.quote_body, quote.data.quote_source, quote.id)}
              </div>
            `
          })
        })
      }
      break
    default:
      listView = () => html`Missing list view configure for document type <b>${docType}</b>`
      break
  }

  return html`
    <body>
      <div class="Page">
      ${Section(Header(state.navDocument, state.ui.header, getLocales()))}
      ${Section(Subnavigation(state, ctx))}
      <div class='Text Text--intro'>
        ${asElement(doc.data.title, linkResolver, serializer())}
        ${doc.data.body[0] ? Section({ body: asElement(doc.data.body[0].primary.body_text, linkResolver, serializer()), isNarrow: true }) : ''}
      </div>
      ${Section({
        isNarrow: false,
        body: Filter(Object.assign({
          documents,
          formAction: ctx.request.url.split('?')[0],
          requestQuery: state.requestQuery
        }, workFilter))
      })}
      ${listView()}
      ${ContactInfo(state.linkedDocuments.contact_info_ref, ctx)}
      ${Footer(state.linkedDocuments.footer_ref, ctx)}
      </div>
    </body>
  `
}
