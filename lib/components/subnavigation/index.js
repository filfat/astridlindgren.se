'use strict'

/**
 * Returns html for subnavigation.
 */

const raw = require('nanohtml/raw')

module.exports = function subnavigation (state) {
  let body = ''
  if (Array.isArray(state.subNav) && state.subNav.length > 0) {
    body += '<div class="subnavigation">'
    state.subNav.forEach(link => {
      const cssClass = link.isActive
        ? 'subnavigation-link subnavigation-link--active'
        : 'subnavigation-link'
      // XXX: add lang and parent page uid to href? "/{lang}/{parent_uid}/{uid}"
      body += `<a href="/${link.uid}" class="${cssClass}">${link.label}</a>`
    })
    body += '</div>'
  }
  return raw(body)
}