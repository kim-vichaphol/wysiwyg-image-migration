const { buildCSVFromJSON } = require('./buildCSVFromJSON')
const { createCSVFile } = require('./createCSVFile')
const { logInfo } = require('./logger')

const IMAGE_REGEX = /\[\[wysiwyg_imageupload:(\d+):\]\]/g

const processJSONArticlesToCSV = ({ jsonArticles, outputCSVFileName, stringToBeReplaced, stringToReplace }) => {
  logInfo(`totalNumberOfArticlesFromJSON: ${jsonArticles.length}`)

  const result = []

  jsonArticles.forEach((article) => {
    let body = article.body
    let filePaths = []
    let fileNames = []

    if (article.iid && article.filepath) {
      body = body.replace(IMAGE_REGEX, (_, iid) => {
        const fileName = jsonArticles.find((article) => article.iid === iid)?.filename
        const filePath = jsonArticles.find((article) => article.iid === iid)?.filepath
        if (!filePath) {
          return ''
        }
        filePaths.push(filePath)
        fileNames.push(fileName)
        const newFilePath = filePath.replace(stringToBeReplaced, stringToReplace)

        const articleWithImageTitle = jsonArticles.find(
          (article) => article.filepath === filePath && article.image_title
        )
        const imageElement = articleWithImageTitle
          ? `<img src="${newFilePath}" /><span style="font-size:0.75rem;">${articleWithImageTitle.image_title}</span>`
          : `<img src="${newFilePath}" />`

        return `<span style="display: flex;flex-direction: column;align-items: center;">${imageElement}</span>`
      })
    }

    const hasExistingArticle = !!result.find((article) => article.body === body)

    if (!hasExistingArticle) {
      const resultArticle = {
        body,
        filepath: filePaths.join() || article.filepath,
        filename: fileNames.join() || article.filename
      }

      for (const key in article) {
        if (key !== 'body' && key !== 'iid' && key !== 'image_title' && key !== 'filepath' && key !== 'filename') {
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
