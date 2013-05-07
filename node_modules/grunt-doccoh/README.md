# grunt-doccoh

Grunt Doccoh plugin. Use [Doccoh] instead of Docco.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-doccoh`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-doccoh');
```

[Doccoh]: https://github.com/rozmiarek/doccoh
[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Config Examples

There are two formats you can use to run this task.

##### Short

``` javascript
doccoh: {
  src: ['*js', 'path1/**/*js', 'path2/**/*js']
}```

##### Long (specific targets with optional target options)

``` javascript
doccoh: {
  app: {
    src: ['*js', 'path1/**/*js', 'path2/**/*js'],
    options: {
      output: 'dir'
    }
  }
}
```

#### Parameters

##### src ```string | array```

This defines which files will be documented.

##### options ```object```

Docco options:
* css ```file``` use a custom css file
* output ```path``` use a custom output path
* template ```file``` use a custom .jst template

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 2012/10/29 - v0.1.3 - Renamed from grunt-docco to grunt-doccoh. Enhanced documentation. Use doccoh instead of docco.

## License
Licensed under the MIT license.