import query from './query'

export default function event (...args) {
  query('send', 'event', ...args)
}
