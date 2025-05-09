const writegood = require('write-good')
const fs = require('fs')
const path = require('path')

function getMarkdownFiles(dir, files = []) {
	const entries = fs.readdirSync(dir);
	const mdFiles = [];
	for (const entry of entries) {
		const filePath = path.join(dir, entry)
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			mdFiles.push(...getMarkdownFiles(filePath))
		} else if (entry.endsWith('.md')) {
			mdFiles.push(filePath)
		}
	}
	return mdFiles
}


const mdFiles = getMarkdownFiles('.')
console.log(mdFiles)

for (const file of mdFiles) {
	try {
		const data = fs.readFileSync(file, 'utf8')
		const suggestions = writegood(data)
		console.log(suggestions)
	} catch (err) {
		console.error(err)
	}
}











