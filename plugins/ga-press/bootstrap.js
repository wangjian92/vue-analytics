import { promisify, loadScript, shouldGaLoad, log } from './helpers'
import config, { update } from './config'
import createTrackers from './create-trackers'
import collectors from './collectors'
import { autoTracking } from './lib/page'
import untracked from './untracked'
import noga from './no-ga'

export default () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  if (!config.id) {
    log('Missing the "id" parameter. Add at least one tracking domain ID')
    return
  }

  const queue = [
    promisify(config.id),
    promisify(config.disabled)
  ]

  if (shouldGaLoad()) {
    const domain = 'https://www.google-analytics.com'
    const filename = config.debug.enabled ? 'analytics_debug' : 'analytics'
    const resourcePromise = config.customResourceURL
      ? loadScript(config.customResourceURL)
      : loadScript(`${domain}/${filename}.js`, domain)

    queue.push(
      resourcePromise.catch(() => {
        log('An error occured! Please check your connection or disable your AD blocker')
      })
    )
  }

  return Promise.all(queue).then(response => {
    update({
      id: response[0],
      disabled: response[1]
    })

    // Opt-in/opt-out #gdpr
    noga(config.disabled)

    // Creates necessary trackers
    createTrackers()

    // Fires all shorthand fields in the options
    collectors()

    // Fires all untracked event that have been fired
    // meanwhile GoogleAnalayitcs script was loading
    untracked()

    // Starts auto tracking
    autoTracking()

    config.ready()
  }).catch(error => {
    if (!config.debug.enabled) {
      return
    }

    log(error.message)
  })
}
