const marked = require("marked");
const grayMatter = require("gray-matter");
const { compile } = require("handlebars");

const fs = require("fs/promises");

async function generateArticles() {
	const template = compile(await fs.readFile("./templates/tutorial.hbs", "utf8"));
	const posts = await fs.readdir("./posts");

	posts.forEach(async (file) => {
			const data = await fs.readFile(`./posts/${file}`, "utf8");

			const article = grayMatter(data);

			const HTML = template({
				content: marked.parse(article.content),
				title: article.data.title,
			});
			
			fs.writeFile(`./articles-static/${file.replace('.md', '.html')}`, HTML);
			
		});
	
}
module.exports = generateArticles;
