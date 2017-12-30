import { upcaseFirstChar } from '../util'

const properties = {
  locale: document.documentElement.getAttribute('lang'),
  navigationCollapsed: false,
  navigationItemsCollapsed: {},
  previewWidths: {}
}

// https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
const reactiveValue = value => {
  if (typeof value === 'object') {
    return value instanceof Array ? value : Object.assign({}, value)
  } else {
    return value
  }
}

// web storage access
const getSession = (key, defaultValue) => {
  const value = window.sessionStorage.getItem(`uiengine/${key}`)
  return value ? JSON.parse(value) : defaultValue
}

const setSession = (key, value) => {
  window.sessionStorage.setItem(`uiengine/${key}`, JSON.stringify(value))

  return value
}

// create state, getters and mutations based on properties;
// get initial state from session storage
const propInitialState = Object.keys(properties).reduce((obj, property) => {
  const defaultValue = properties[property]
  obj[property] = getSession(property, defaultValue)

  return obj
}, {})

const propGetters = Object.keys(properties).reduce((obj, property) => {
  obj[property] = state => state[property]

  return obj
}, {})

const propMutations = Object.keys(properties).reduce((obj, property) => {
  const upcased = upcaseFirstChar(property)
  const setter = `set${upcased}`

  obj[setter] = (state, value) => {
    // set value in session storage
    setSession(property, value)

    state[property] = reactiveValue(value)
  }

  return obj
}, {})

const initialState = {
  ...propInitialState
}

const getters = {
  ...propGetters
}

const mutations = {
  ...propMutations
}

// preferences are set synchronously, hence no actions
const actions = {
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
}