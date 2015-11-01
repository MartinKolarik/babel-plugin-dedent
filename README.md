# babel-plugin-dedent

Removes indentation from multiline template strings. Works with both tabs and spaces.

## Installation

```
$ npm install babel babel-plugin-dedent
$ babel --plugins dedent script.js
```

### Babel v6

v2.x.x of this plugin is required. Older versions are not compatible with Babel v6. Note that this plugin needs to be run before `transform-es2015-template-literals`,
which is part of the `es2015` preset. Currently, there's no way to do that when using presets, so you need to manually specify all transforms you want to use.

## Usage

Indentation will be removed from all strings tagged with `dedent` tag (you can also use `dedent` as a function, if you need to use your own tag).

```js
expect(dedent`Line #1
	Line #2
	Line #3`).to.equal('Line #1\nLine #2\nLine #3');

// Leading/trailing line break is removed.
expect(
	dedent`
	Line #1
	Line #2
	Line #3
	`
).to.equal('Line #1\nLine #2\nLine #3');

// No more than one leading/trailing line break is removed.
expect(
	dedent`

	Line #1
	Line #2
	Line #3

	`
).to.equal('\nLine #1\nLine #2\nLine #3\n');

// Only the "base" indentation is removed.
expect(
	dedent`
	Line #1
		Line #2
			Line #3
	`
).to.equal('Line #1\n\tLine #2\n\t\tLine #3');

// The last line is ignored if it doesn't contain anything else than whitespace.
expect(
	function () {
		return dedent`
			Line #1
			Line #2
			Line #3
		`;
	}()
).to.equal('Line #1\nLine #2\nLine #3');

// Escaped characters are ignored.
expect(
	dedent`
	\tLine #1
	\tLine #2
	\tLine #3
	`
).to.equal('\tLine #1\n\tLine #2\n\tLine #3');
```

## License
Copyright (c) 2015 Martin Kolárik. Released under the MIT license.
