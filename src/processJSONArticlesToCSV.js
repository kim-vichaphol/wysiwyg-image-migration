const { buildCSVFromJSON } = require('./buildCSVFromJSON')
const { createCSVFile } = require('./createCSVFile')
const { logInfo } = require('./logger')

const IMAGE_REGEX = /\[\[wysiwyg_imageupload:(\d+):\]\]/g

const processJSONArticlesToCSV = (jsonArticles, outputCSVFileName) => {
  logInfo(`totalNumberOfArticlesFromJSON: ${jsonArticles.length}`)

  const result = []

  jsonArticles.forEach((article) => {
    let body = article.body

    if (article.iid && article.filepath) {
      body = body.replace(IMAGE_REGEX, (_, iid) => {
        const filePath = jsonArticles.find((article) => article.iid === iid)?.filepath
        if (!filePath) {
          return ''
        }

        const articleWithImageTitle = jsonArticles.find(
          (article) => article.filepath === filePath && article.image_title
        )
        const imageElement = articleWithImageTitle
          ? `<img src="${filePath}" /><span style="font-size:0.75rem;">${articleWithImageTitle.image_title}</span>`
          : `<img src="${filePath}" />`

        return `<span style="display: flex;flex-direction: column;align-items: center;">${imageElement}</span>`
      })
    }

    const hasExistingArticle = !!result.find((article) => article.body === body)

    if (!hasExistingArticle) {
      const resultArticle = { body }
      for (const key in article) {
        if (key !== 'body' && key !== 'iid' && key !== 'filepath' && key !== 'image_title') {
          resultArticle[key] = article[key]
        }
      }
      result.push(resultArticle)
    }
  })

  logInfo(`totalNumberOfArticles: ${result.length}`)

  const csvData = buildCSVFromJSON(result)
  createCSVFile(csvData, outputCSVFileName)
}

module.exports = {
  processJSONArticlesToCSV
}
