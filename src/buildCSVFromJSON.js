const buildCSVFromJSON = (jsonData) =>
  [
    Object.keys(jsonData[0]),
    ...jsonData.map((row) =>
      Object.values(row).map((value) => (typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value))
    )
  ]
    .map((row) => row.join(','))
    .join('\n')

module.exports = {
  buildCSVFromJSON
}
