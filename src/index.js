const { processJSONArticlesToCSV } = require('./processJSONArticlesToCSV')
const jsonData = require('../json-articles.json')

const OUTPUT_FILE_NAME = 'report-articles.csv'

const main = () => {
  processJSONArticlesToCSV(jsonData, OUTPUT_FILE_NAME)
}

main()
