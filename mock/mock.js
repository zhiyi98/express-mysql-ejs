const Mock = require('mockjs')
const fs = require('fs');

let articles = []
for (let i = 1; i <= 10000; i++) {
  const _data = {
    id: i,
    name: Mock.mock('@cname()'),
    date: Mock.mock('@date()'),
    county: Mock.mock('@county(true)'),
    email: Mock.mock('@email()'),
    sex: Mock.mock('@character("男女")'),
    message: Mock.mock('@cparagraph()')
  }
  articles.push(_data)
}
let data = JSON.stringify(articles)

fs.writeFile('./data.json', data, function (err) {
  if (err) {
    console.error(err)
  } else {
    console.log('保存成功')
  }
})
