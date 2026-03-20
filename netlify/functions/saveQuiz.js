exports.handler = async function(event){

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const repo = "youssef86686-prog/Acdimac-web"
const path = "summaries.json"

const data = JSON.parse(event.body)

const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{
headers:{ Authorization:`token ${GITHUB_TOKEN}` }
})

const file = await res.json()

const updatedContent = Buffer.from(JSON.stringify(data,null,2)).toString("base64")

await fetch(`https://api.github.com/repos/${repo}/contents/${path}`,{
method:"PUT",
headers:{
Authorization:`token ${GITHUB_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"update",
content:updatedContent,
sha:file.sha
})
})

return {statusCode:200,body:"done"}
}
