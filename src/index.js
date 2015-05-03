export default function babelDedent (babel) {
	let t = babel.types;

	return new babel.Transformer('plugin-dedent', {
		CallExpression (node) {
			if (t.isIdentifier(node.callee, { name: 'dedent' })) {
				if (t.isTemplateLiteral(node.arguments[0])) {
					transform(node.arguments[0].quasis);
					return node.arguments[0];
				} else if (t.isTaggedTemplateExpression(node.arguments[0])) {
					transform(node.arguments[0].quasi.quasis);
					return node.arguments[0];
				}
			}
		},
		TaggedTemplateExpression (node) {
			if (t.isIdentifier(node.tag, { name: 'dedent' })) {
				transform(node.quasi.quasis);
				return node.quasi;
			}
		},
	});
}

function transform (quasis) {
	let elements = quasis.filter(element => element.type === 'TemplateElement');
	let matches = [];
	let pattern;

	elements.forEach((element) => {
		let match = element.value.raw.match(/\n[\t ]+/g);

		if (match) {
			matches.push(...match);
		}
	});

	if (matches.length) {
		let size = Math.min(...matches.map((value) => value.length - 1));
		pattern = new RegExp(`\n[\t ]{${size}}`, 'g');
	}

	[ 'raw', 'cooked' ].forEach((type) => {
		if (matches.length) {
			elements.forEach((element) => {
				element.value[type] = element.value[type].replace(pattern, '\n');
			});
		}

		elements[0].value[type] = elements[0].value[type].replace(/^\r?\n/, '');
		elements[elements.length - 1].value[type] = elements[elements.length - 1].value[type].replace(/\r?\n$/, '');
	});
}
