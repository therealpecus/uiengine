
const htmlescape = require('htmlescape')
const { requireFromMemory, readFromMemory, buildQueued } = require('./util')

async function registerComponentFile (options, filePath) {
  // TODO: Implement strategies for the particular extract use cases.
}

async function render (options, filePath, data = {}) {
  const { serverConfig, clientConfig } = options

  await buildQueued(options, filePath)

  let rendered, foot
  if (serverConfig) {
    const serverRender = requireFromMemory(filePath, 'serverRender')
    const Component = requireFromMemory(filePath, 'serverComponent')
    rendered = await serverRender(Component, data)
  }

  if (clientConfig) {
    const clientRenderJs = readFromMemory(filePath, 'clientRender')
    const clientComponentJs = readFromMemory(filePath, 'clientComponent')
    const renderJs = `(function() {
        var ClientRenderModule = ${clientRenderJs};
        var ComponentModule = ${clientComponentJs};
        var clientRender = ClientRenderModule.default || ClientRenderModule;
        var Component = ComponentModule.default || ComponentModule;
        clientRender(Component, ${htmlescape(data)});
      })();`
    const script = `data:text/javascript;base64,${Buffer.from(renderJs).toString('base64')}`
    foot = `<script title="Webpack Adapter Client-Side Rendering" src="${script}"></script>`
  }

  return {
    rendered,
    foot
  }
}

module.exports = {
  render,
  registerComponentFile
}