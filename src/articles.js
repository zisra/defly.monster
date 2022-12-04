const marked = require('marked');
const grayMatter = require('gray-matter');
const { compile } = require('handlebars');
const sanitize = require('sanitize-html');

const fs = require('fs');

function generateArticles() {
	const articleTemplate = compile(
		fs.readFileSync('./src/templates/article.hbs', 'utf8')
	);
	const posts = fs.readdirSync('./posts');
	const postsJSON = [];

	posts.forEach(async (file) => {
		const data = fs.readFileSync(`./posts/${file}`, 'utf8');

		const article = grayMatter(data);

		const templateData = {
			title: article.data.title,
			tags: article.data.tags,
			author: article.data.author,
			content: sanitize(marked.parse(article.content)),
			markdown: article.content,
		};

		const HTML = articleTemplate(templateData);
		postsJSON.push(templateData);
		fs.writeFileSync(`./src/publicArticles/${file.replace('.md', '.html')}`, HTML);
	});

	const articlesTemplate = compile(
		fs.readFileSync('./src/templates/articles.hbs', 'utf8')
	);

	const HTML = articlesTemplate({
		articles: postsJSON, 
		tags: [...new Set(postsJSON.map(post=>post.tags).flat())]
	});
	fs.writeFileSync('./src/publicArticles/index.html', HTML);

	postsJSON.forEach(article=>{
		delete article.content;
	});

	fs.writeFileSync('./src/articles.json', JSON.stringify(postsJSON));
	return postsJSON; 
}

module.exports = generateArticles;
