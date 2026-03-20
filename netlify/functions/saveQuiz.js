const { Octokit } = require("@octokit/rest")

exports.handler = async (event) => {

const github = new Octokit({
auth: process.env.GITHUB_TOKEN
})

const data = JSON.parse(event.body)

const content = Buffer.from(JSON.stringify(data,null,2)).toString("base64")

// هات الملف القديم
const { data: file } = await github.repos.getContent({
owner: "YOUR_USERNAME",
repo: "YOUR_REPO",
path: "quiz.json"
})

// تحديث الملف
await github.repos.createOrUpdateFileContents({
owner: "YOUR_USERNAME",
repo: "YOUR_REPO",
path: "quiz.json",
message: "update quiz",
content: content,
sha: file.sha
})

return {
statusCode: 200,
body: "done"
}
}
