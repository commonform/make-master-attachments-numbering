var outline = require('outline-numbering')
var decimal = require('decimal-numbering')

module.exports = function (masterName, attachmentName, numberingScheme) {
  if (!numberingScheme) {
    var numberingScheme = outline
  } else if (numberingScheme == 'decimal') {
    numberingScheme = decimal
  } else {
    console.log("Invalid numbering scheme supplied; defaulting to outline.")
    numberingScheme = outline
  }

  function useDecimal() {
    numberingScheme = decimal
  }
  function withinMaster(numbering) {
    var first = numbering[0]
    return (
      first.series.number === 1 &&
      first.element.number === 1 ) }

  function stripNounPrefix(string) {
    return string.replace('Section ', '') }

 return function(numbering, shortForm) {
    var length = numbering.length
    if (length < 1) {
      throw new Error('Invalid numbering') }
    var first = numbering[0]
    if (withinMaster(numbering)) {
      if (length === 1) {
        return (
          shortForm ?
            ( masterName + '.' ) :
            ( 'the ' + masterName ) ) }
      else {
        return (
          ( !shortForm ? 'Section ' : '' ) +
          stripNounPrefix(numberingScheme(numbering.slice(1), shortForm)) +
          ( !shortForm ? ( ' of the ' + masterName ) : '' ) ) } }
    else {
      var inFirstSeries = ( numbering[0].series.number === 1 )
      var attachmentNumber = (
        attachmentName + ' ' +
        stripNounPrefix(
          numberingScheme(
            [ { series: {
                  number: first.series.number,
                  of: first.series.of },
                element: {
                  number: (
                    inFirstSeries ?
                      ( first.element.number - 1 ) :
                      first.element.number ),
                  of: (
                    inFirstSeries ?
                      ( first.element.of - 1 ) :
                      first.element.of ) } } ],
            shortForm)) )
      if (length === 1) {
        return attachmentNumber }
      else {
        return (
          ( !shortForm ? 'Section ' : '' ) +
          stripNounPrefix(numberingScheme(numbering.slice(1), shortForm)) +
          ( !shortForm ? ( ' of ' + attachmentNumber ) : '' ) ) } } } }
