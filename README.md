```javascript
var makeNumbering = require('make-master-attachments-numbering')
```

The package generates numbering schemes as described by [abstract-numbering](https://www.npmjs.com/package/abstract-numbering).

# The Master

```javascript
var agreementExhibits = makeNumbering('Agreement', 'Exhibit')
```

The first child form is the agreement:

```javascript
var assert = require('assert')
assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 5 },
        element: { number: 1, of: 4 } } ],
    true),
  'Agreement.')

assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } } ],
    false),
  'the Agreement')
```

By default, children of the master are numbered by [outline-numbering][outline-numbering]:

```javascript
assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } } ]),
  'Section 1 of the Agreement')

assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } } ]),
  'Section 1(a) of the Agreement')

assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } } ],
    true),
  '1.')
```

# Attachments

Any other child form is an attachment:

```javascript
assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 2, of: 2 } } ],
    true),
  'Exhibit 1.')

assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 2, of: 2 } } ],
    false),
  'Exhibit 1')

assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 2 },
        element: { number: 2, of: 2 } } ],
    true),
  'Exhibit A-1.')

assert.equal(
  agreementExhibits(
    [ { series:  { number: 11, of: 11 },
        element: { number: 13, of: 13 } } ],
    true),
  'Exhibit K-13.')
```

The children of each attachment are numbered by [outline-numbering][outline-numbering]:

```javascript
assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 2, of: 2 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } } ],
    false),
  'Section 1 of Exhibit 1')

assert.equal(
  agreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 2, of: 2 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } } ],
    true),
  '1.')
```

Optionally, [decimal-numbering][decimal-numbering] may be used instead of [outline-numbering][outline-numbering] (*e.g.* `1.2.5`) by adding an optional `'decimal'` argument:

```javascript
var decimalAgreementExhibits = makeNumbering('Agreement', 'Exhibit', 'decimal')

assert.equal(
  decimalAgreementExhibits(
    [ { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } },
      { series:  { number: 1, of: 1 },
        element: { number: 1, of: 1 } } ]),
  'Section 1.1 of the Agreement')
```

[outline-numbering]: https://npmjs.com/packages/outline-numbering
[decimal-numbering]: https://npmjs.com/packages/decimal-numbering
