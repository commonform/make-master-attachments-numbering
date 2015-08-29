var deepEqual = require('deep-equal')
var outline = require('outline-numbering')

function withinAgreement(numbering) {
  return deepEqual(
    numbering[0],
    { series:  { number: 1, of: 1 },
      element: { number: 1, of: 1 } }) }

function withinSchedules(numbering) {
  return deepEqual(
    numbering[0],
    { series:  { number: 1, of: 1 },
      element: { number: 2, of: 2 } }) }

module.exports = function(numbering, shortForm) {
  var length = numbering.length
  if (length < 1) {
    throw new Error('Invalid numbering') }
  var first = numbering[0]
  if (withinAgreement(numbering)) {
    if (length === 1) {
      return ( shortForm ? 'Agreement.' : 'the Agreement' ) }
    else {
      return (
        ( !shortForm ? 'Section ' : '' ) +
        outline(numbering.slice(1), shortForm) +
        ( !shortForm ? ' of the Agreement' : '' ) ) } }
  else if (withinSchedules(numbering)) {
    if (length === 1) {
      return ( shortForm ? 'Schedules.' : 'Schedules to the Agreement' ) }
    else {
      var scheduleNumber = (
        'Schedule ' +
        outline([ numbering[1] ], shortForm) )
      if (length === 2) {
        return scheduleNumber }
      else {
        return (
          ( !shortForm ? 'Section ' : '' ) +
          outline(numbering.slice(2), shortForm) +
          ( !shortForm ? ( ' of ' + scheduleNumber ) : '' ) ) } } }
  else {
    var exhibitNumber = (
      'Exhibit ' +
      outline(
        [ { series: {
              number: first.series.number,
              of: first.series.number },
            element: {
              number: ( first.element.number - 2),
              of: ( first.element.number - 2 ) } } ],
        shortForm) )
    if (length === 1) {
      return exhibitNumber }
    else {
      return (
        ( !shortForm ? 'Section ' : '' ) +
        outline(numbering.slice(1), shortForm) +
        ( !shortForm ? ( ' of ' + exhibitNumber ) : '' ) ) } } }