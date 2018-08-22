const html = require('nanohtml')
const raw = require('nanohtml/raw')

let Footer = (data) => {
  // Fail if linkedDocuments.footer_ref is null or undefined
  if (!data) {
    console.warn('ContactInfo: data is undefined')
    return html``
  }

  // Set data to actual body
  data = data.values().next().value.data

  // Loop through every linkblock in footer and add generate HTML
  let output = ''
  for (let i = 0; i < data.body.length; i++) {
    let item = data.body[i]
    output += '<div class="Footer-content-linksblock">' + '<span class="Footer-content-linksblock-title">' + item.primary.title + '</span>'

    for (let ii = 0; ii < item.items.length; ii++) {
      output += '<a class="Footer-content-linksblock-link" href="' + (linkToHref(item.items[ii].link)) + '">' + item.items[ii].title + '</a>'
    }

    output += '</div>'
  }

  return html`
  <footer>
    <img src="/al_logo_black.svg" alt="Astrid Lindgren Company" class="Logo Footer-logo"/>
    <div class="Footer-content">
      ${raw(output)}
    </div>
    <div class="Footer-copyright">Copyright © 2005-${(new Date()).getFullYear()} ${data.company_info}</div>
  </footer>
  `
}

/**
 * Convert prismic link object into link
 *
 * TODO: Create module out of this
 *
 * @param {link} prismicLink
 */
let linkToHref = (link) => {
  if (link.link_type === 'Document' && link.uid) return '/' + link.uid
  else if (link.link_type === 'Web') return link.url

  return '/404'
}
module.exports = Footer