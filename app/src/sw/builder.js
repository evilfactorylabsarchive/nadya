const workboxBuild = require('workbox-build')

const configureSw = () => {
  return workboxBuild
    .injectManifest({
      swSrc: 'src/sw/template.js',
      swDest: 'build/sw.js',
      globDirectory: 'build',
      globPatterns: ['**/*.{js,css,html,png}']
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn)
      console.log(`${count} files will be precached, totaling ${size} bytes.`)
    })
}
configureSw()
