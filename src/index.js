const { processJSONArticlesToCSV } = require('./processJSONArticlesToCSV')
const jsonData = require('../json-articles.json')

const OUTPUT_FILE_NAME = 'report-articles.csv'
const stringToBeReplaced = 'https://oldfreedom.ilaw.or.th/sites/default/files/wysiwyg_imageupload/1/'
const stringToReplace = 'http://new.ilaw.or.th/wp-content/uploads/2024/05/'

const main = () => {
  processJSONArticlesToCSV({ jsonData, OUTPUT_FILE_NAME, stringToBeReplaced, stringToReplace })
}

main()
