export const template = (name) =>
`
# Project config: Defaults to name and version from package.json.
# Here you can overwrite it and add more custom properties.
# For a detailed documentation of all the options in here see
# https://github.com/dennisreimann/uiengine/blob/master/docs/config.md
name: ${name}

# Base directories for the input, your raw source files:
# - components is the root of the directory containing the components
# - templates contains the variation preview and sandbox templates
# - pages is the directory of the UIengine's site structure and page markdown files
source:
  components: ./src/components
  templates: ./src/templates
  pages: ./src/pages

# Destination paths for the generated output.
target: ./dist

# Adapters are used for templating/rendering. Each adapter is a module that gets required
# and needs to provide functions for setup and rendering. For details see the adapters docs.
adapters:
  pug:
    module: uiengine-adapter-pug
    options:
      pretty: true
      basedir: ./src/components

# Here you can configure the template that the variation preview gets embeded in.
# By default the list of templates is generated from the files within the templates
# source directory – the filename without extension being the key.
# You will need at least a template named "variation" for the variation preview.
# Here you can configure this preview as well as other templates.
templates:
  variation: variation-preview.pug

# UIengine will require the theme, which has to provide a defined set of functions
# for setup and rendering. For details see the theme docs.
# theme:
#   module: uiengine-theme-default
#   options:
#     lang: en
#     skin: default
#     hljs: atom-one-dark

# Here you can configure the breakpoints for your project.
# Declare them with the name as key and the minimum media query pixel being the value.
# breakpoints:
#   XS: 320
#   S: 560
#   M: 760
#   L: 960
#   XL: 1280
`