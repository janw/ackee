#!/usr/bin/env node


import { build, index, scripts, styles, tracker } from './src/ui/index.js'

build('dist/index.css', styles)
build('dist/index.js', scripts)
build('dist/tracker.js', tracker)
build('dist/index.html', index)