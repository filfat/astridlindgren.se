'use strict'

/**
 * Render of the page type 'page'.
 */

const html = require('nanohtml')
const asElement = require('prismic-element')
const {linkResolver} = require('../resolve')
const { getLocales } = require('../locale')
const FontClass = require('../components/base/fonts')
const Section = require('../components/section')
const Header = require('../components/header')
const Slices = require('../components/slices')
const Hero = require('../components/hero')
const ContactInfo = require('../components/contact_info')
const Footer = require('../components/footer')
const serializer = require('../components/text/serializer')
const Subnavigation = require('../components/subnavigation')

module.exports = (state, ctx) => {
  const uid = state.uid
  const doc = state.pages.items.find(item => item.uid === uid)
  var hasCollasibleBody = doc.data.theme_collapse_main_body === 'Ja'

  const headerFont = state.font ? ' ' + FontClass(state.font) : ''
  let heading = {}
  heading[headerFont] = true

  return html`
    <body>
      <div class="Page">
        ${Section(Header(state.navDocument, state.ui.header, getLocales()))}
        <div class="${state.is_character_menu ? 'SubNav-CharacterMenu-Wrapper' : ''}" style="position:relative;">
          ${state.is_character_menu ? Section(Subnavigation(state, ctx, true)) : ''}
          ${Section(Subnavigation(state, ctx))}
          ${Section(Hero(doc.data.hero_image))}
        </div>
        ${Section({
          push: false,
          isNarrow: true,
          body: html`
            <div class="Text Text--article Text--intro">
              ${asElement(doc.data.title, linkResolver, serializer({
                classes: {
                  heading1: heading
                }
              }))}
              ${asElement(doc.data.intro, linkResolver, serializer())}
            </div>
          `
        })}
        ${Section({
          isExpandable: hasCollasibleBody,
          isNarrow: true,
          body: html`
            <div class="Text Text--article">
              ${asElement(doc.data.main_body, linkResolver, serializer({
                classes: {
                  heading2: { 'Text-h3': true }
                }
              }))}
            </div>
          `})
        }
        ${Slices(state, doc.data.body, (html) => Section({ body: html, push: true }, ctx))}
        ${ContactInfo(state.linkedDocuments.contact_info_ref, ctx)}
        ${Footer(state.linkedDocuments.footer_ref, ctx)}
      </div>
    </body>
    `
}
