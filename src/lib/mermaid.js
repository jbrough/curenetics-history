const text = require('./flowchart')

function slugify(text){
	  return text.toString().toLowerCase().trim()
	    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
	    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
	    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

class Questions {
	constructor (id, paths, questions) {
		this.paths = paths
		this.questions = questions

		this.question = questions[id]
	}

	SetId (id) {
		if (this.questions[id]) {
			this.question = this.questions[id]
		}
	}

	Ask () {
		return this.question
	}

	Answer (val) {
		let k = [this.question.Id(), val].join('/')
		let id = this.paths[k]
		if (!id && val && val !== '' && val !== 'no') {
			k = [this.question.Id(), 'yes'].join('/')
			id = this.paths[k]
		}

		if (this.paths[id + '/']) {
			id = this.paths[id + '/']
		}

		this.question = this.questions[id]
	}

	Id () {
		return this.question.Id()
	}

	Slug() {
		return this.question.Slug()
	}

	GoTo(slug) {
		const parts = slug.split('-')
		const id = parts[parts.length-1]
		this.SetId(id)
	}
}

class Question {
	constructor (node, nodes) {
		this.node = node
		this.nodes = nodes
	}

	Options () {
		return this.nodes
	}

	Id () {
		return this.node.id
	}

	Label () {
		return this.node.label
	}

	Slug() {
		return slugify(this.Label()) + '-' + this.Id()
	}

	IsField () {
		return false
	}

	IsRadio () {
		return this.IsBool && !this.IsMulti()
	}

	IsBool () {
		return this.childAttrs('value').includes('yes')
	}

	IsMulti () {
		return this.childAttrs('isMulti').includes(true)
	}

	Values () {
		if (this.IsBool()) {
			return ['yes', 'no']
		} else {
			return this.childAttrs('value')
		}
	}

	Labels () {
		if (this.IsBool()) {
			return ['Yes', 'No']
		} else {
			return this.childAttrs('label')
		}
	}

	childAttrs (attr) {
		return this.nodes.map(function (n) { return n[attr] })
	}
}

class Node {
	constructor (
		parentId, id, label, value, isMulti
	) {
		this.parentId = parentId
		this.id = id
		this.value = value
		this.isMulti = isMulti

		this.label = undefined
		this.isField = undefined

		if (label) {
			this.label = label.split('::')[0]
			this.isField = label.includes('::')
		}
	}
}

function parser (text) {
	function parse (l) {
		let parentId, id, label, value, multi

		let idLabel
		if (l.includes('-->')) {
			const t1 = l.split('-->')
			parentId = t1[0]

			if (l.includes('|')) {
				const t2 = t1[1].split('|')
				value = t2[1]
				idLabel = t2[2]
			} else {
				idLabel = t1[1]
			}
		} else {
			idLabel = l
		}

		[ id, label, multi ] = parseIdAndLabel(idLabel)

		return new Node(parentId, id, label, value, multi)
	}

	function parseIdAndLabel (s) {
		let a, b, multi
		if (s.includes('[')) {
			a = '['
			b = ']'
			multi = false
		} else if (s.includes('(')) {
			a = '('
			b = ')'
			multi = true
		}

		const t1 = s.split(a)
		const id = t1[0]

		let label
		if (t1[1]) {
			label = t1[1].replace(b, '')
		}

		return [ id, label, multi ]
	}

	const nodes = []

	text.split('\n').forEach(function (l) {
		if (l !== 'graph TD' && l !== '') {
			const n = parse(l)
			nodes.push(n)
		}
	})

	const labels = {}

	const children = {}
	const paths = {}

	nodes.forEach(function (n) {
		if (children[n.id] === undefined) {
			children[n.id] = []
		}
	})

	nodes.forEach(function (n) {
		if (!labels[n.id]) labels[n.id] = n.label

		paths[[n.parentId, n.value].join('/')] = n.id
	})

	nodes.forEach(function (n) {
		console.log(n)
		if (n.parentId && n.value !== 'next') {
			children[n.parentId].push(n)
		}
	})

	const questions = {}

	nodes.forEach(function (n) {
		n.label = labels[n.id]
		const q = new Question(n, children[n.id])
		questions[n.id] = q
	})

	return new Questions(nodes[0].id, paths, questions)
}

function mermaid () {
	return parser(text())
}

// mermaid()
export default mermaid
