const marked = require('marked');
const grayMatter = require('gray-matter');
const { compile } = require('handlebars');

const fs = require('fs');

function generateArticles() {
	const articleTemplate = compile(
		fs.readFileSync('./templates/article.hbs', 'utf8')
	);
	const posts = fs.readdirSync('./posts');
	const postsJSON = [];

	posts.forEach(async (file) => {
		const data = fs.readFileSync(`./posts/${file}`, 'utf8');

		const article = grayMatter(data);

		const templateData = {
			content: marked.parse(article.content),
			title: article.data.title,
			tags: article.data.tags,
			author: article.data.author,
		};

		const HTML = articleTemplate(templateData);
		postsJSON.push(templateData);
		fs.writeFileSync(`./articles-static/${file.replace('.md', '.html')}`, HTML);
	});

	const articlesTemplate = compile(
		fs.readFileSync('./templates/articles.hbs', 'utf8')
	);

	const HTML = articlesTemplate({
		articles: postsJSON, 
		tags: [...new Set(postsJSON.map(post=>post.tags).flat())]
	});
	fs.writeFileSync('./articles-static/index.html', HTML);

	fs.writeFileSync('./articles.json', JSON.stringify(postsJSON));
	return postsJSON; 
}

module.exports = generateArticles;
