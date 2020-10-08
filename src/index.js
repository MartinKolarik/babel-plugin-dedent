module.exports = function babelPluginDedent (babel) {
	let t = babel.types;

	return {
		visitor: {
			CallExpression (path) {
				let node = path.node;

				if (t.isIdentifier(node.callee, { name: 'dedent' })) {
					if (t.isTemplateLiteral(node.arguments[0])) {
						transform(node.arguments[0].quasis);
						path.replaceWith(node.arguments[0]);
					} else if (t.isTaggedTemplateExpression(node.arguments[0])) {
						transform(node.arguments[0].quasi.quasis);
						path.replaceWith(node.arguments[0]);
					}
				}
			},
			TaggedTemplateExpression (path) {
				let node = path.node;

				if (t.isIdentifier(node.tag, { name: 'dedent' })) {
					transform(node.quasi.quasis);
					path.replaceWith(node.quasi);
				}
			},
		},
	};
};

function transform (quasis) {
	let elements = quasis.filter(element => element.type === 'TemplateElement');
	let matches = [];

	rtrim(elements[elements.length - 1]);

	elements.forEach((element) => {
		let match;

		if (match = element.value.raw.match(/\n[\t ]+/g)) {
			matches.push(...match);
		}
	});

	if (matches.length) {
		let size = Math.min(...matches.map(value => value.length - 1));
		let pattern = new RegExp(`\n[\t ]{${size}}`, 'g');

		[ 'raw', 'cooked' ].forEach((type) => {
			elements.forEach((element) => {
				element.value[type] = element.value[type].replace(pattern, '\n');
			});
		});
	}

	ltrim(elements[0]);
}

function ltrim (element) {
	let pattern = /^\r?\n/;

	if (pattern.test(element.value.raw)) {
		element.value.raw = element.value.raw.replace(pattern, '');
		element.value.cooked = element.value.cooked.replace(pattern, '');
	}

	return element;
}

function rtrim (element) {
	let match;

	if (match = element.value.raw.match(/\r?\n([\t ]*)$/)) {
		let pattern = new RegExp(`\r?\n[\t ]{${match[1].length}}$`);

		element.value.raw = element.value.raw.replace(pattern, '');
		element.value.cooked = element.value.cooked.replace(pattern, '');
	}

	return element;
}
