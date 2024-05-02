const fs = require('fs')

const createCSVFile = (csvData, outputFileName) => {
  fs.writeFile(outputFileName, csvData, (error) => {
    if (error) {
      console.error('Error writing CSV file:', error)
    } else {
      console.log('CSV file written successfully!')
    }
  })
}

module.exports = {
  createCSVFile
}
