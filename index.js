var outline = require('outline-numbering')

module.exports = function (masterName, attachmentName) {
  function withinMaster (numbering) {
    var first = numbering[0]
    return (
      first.series.number === 1 &&
      first.element.number === 1
    )
  }

  function stripNounPrefix (string) {
    return string.replace('Section ', '')
  }

  return function (numbering, shortForm) {
    var length = numbering.length
    if (length < 1) {
      throw new Error('Invalid numbering')
    }
    var first = numbering[0]
    if (withinMaster(numbering)) {
      if (length === 1) {
        return (
          shortForm
            ? (masterName + '.')
            : ('the ' + masterName)
        )
      } else {
        return (
          (!shortForm ? 'Section ' : '') +
          stripNounPrefix(outline(numbering.slice(1), shortForm)) +
          (!shortForm ? (' of the ' + masterName) : '')
        )
      }
    } else {
      var inFirstSeries = (numbering[0].series.number === 1)
      var attachmentNumber = (
        attachmentName + ' ' +
        stripNounPrefix(
          outline(
            [
              {
                series: {
                  number: first.series.number,
                  of: first.series.of
                },
                element: {
                  number: (
                    inFirstSeries
                      ? (first.element.number - 1)
                      : first.element.number
                  ),
                  of: (
                    inFirstSeries
                      ? (first.element.of - 1)
                      : first.element.of
                  )
                }
              }
            ], shortForm
          )
        )
      )
      if (length === 1) {
        return attachmentNumber
      } else {
        return (
          (!shortForm ? 'Section ' : '') +
          stripNounPrefix(outline(numbering.slice(1), shortForm)) +
          (!shortForm ? (' of ' + attachmentNumber) : ''))
      }
    }
  }
}
