import generateID from './helpers/generateID'

const keys = [...Array(22).keys()].map(generateID)

export default function generateTree() {
  let tree = {
    [keys[0]]: {
      id: keys[0],
      name: 'purchase',
      childIds: [keys[1], keys[4], keys[5], keys[6], keys[13], keys[21]]
    },
    [keys[1]]: {
      id: keys[1],
      name: 'name',
      question: 'Please provide your full name as <first name> <last name>',
      childIds: [keys[2], keys[3]],
      parseExpr: 'function (value) {\n  var re = /(\\S+)\\s+(.*)/;\n  var match = re.exec(value);\n  return {\n    firstName: match[1],\n    lastName: match[2]\n  };\n}'
    },
    [keys[2]]: {
      id: keys[2],
      name: 'firstName',
      question: 'What is your first name?',
      childIds: []
    },
    [keys[3]]: {
      id: keys[3],
      name: 'lastName',
      question: 'What is your last name?',
      childIds: []
    },
    [keys[4]]: {
      id: keys[4],
      name: 'planChoice',
      enumeration: [
        '12 mo - BYO mobile - 500 MB',
        '12 mo - BYO mobile - 5 GB',
        '12 mo - BYO mobile - 10 GB',
        '2 yr - 1 GB',
        '2 yr - 3 GB',
        '2 yr - 10 GB',
        '2 yr - 20 GB',
        '2 yr - 30 GB',
        'Casual SIM - 500 MB',
        'Casual SIM - 5 GB',
        'Casual SIM - 10 GB'
      ],
      confirm: 'Is this correct?',
      childIds: []
    },
    [keys[5]]: {
      id: keys[5],
      name: 'phone',
      question: 'What is your phone number?',
      validateExpr: '',
      invalidMessage: 'Invalid format. Please try again.',
      childIds: []
    },
    [keys[6]]: {
      id: keys[6],
      name: 'paymentMethod',
      childIds: [keys[7], keys[8], keys[9], keys[10]],
      confirm: 'Are the following payment details correct?'
    },
    [keys[7]]: {
      id: keys[7],
      name: 'cardholderName',
      question: 'What is the card holder\'s name?',
      childIds: []
    },
    [keys[8]]: {
      id: keys[8],
      name: 'cardNumber',
      question: 'What is the card number?',
      caption: 'Card number ending in',
      childIds: []
    },
    [keys[9]]: {
      id: keys[9],
      name: 'securityCode',
      question: 'What is the security code for the card?',
      childIds: []
    },
    [keys[10]]: {
      id: keys[10],
      name: 'expiryDate',
      question: 'Please provide the expiry date as e.g. 01/18',
      childIds: [keys[11], keys[12]],
      parseExpr: 'function (value) {\n  var re = /(\\d+{1,2})/(\\d+{2})/;\n  var match = re.exec(value);\n  return {\n    expiryMonth: match[1],\n    expiryYear: match[2]\n  };\n}'
    },
    [keys[11]]: {
      id: keys[11],
      name: 'expiryMonth',
      childIds: []
    },
    [keys[12]]: {
      id: keys[12],
      name: 'expiryYear',
      childIds: []
    },
    [keys[13]]: {
      id: keys[13],
      name: 'address',
      question: 'Please provide your address as <street> <city> <state> <postcode>',
      childIds: [keys[14], keys[15], keys[16], keys[17], keys[18], keys[19], keys[20]],
      parseApi: 'https://tombot1.ngrok.io/address?q=%s',
      parseExpr: 'function (value) {\n  return {\n    street1: value.street1,\n    city: value.city,\n    state: value.state,\n    postcode: value.postcode,\n    country: value.country,\n    latitude: value.latitude,\n    longitude: value.longitude\n  };\n}',
      confirm: 'Is this address correct?'
    },
    [keys[14]]: {
      id: keys[14],
      name: 'street1',
      question: 'What is your street as <street number> <street name> <street type>',
      childIds: []
    },
    [keys[15]]: {
      id: keys[15],
      name: 'city',
      question: 'What is your city?',
      childIds: []
    },
    [keys[16]]: {
      id: keys[16],
      name: 'state',
      question: 'What is your state?',
      childIds: []
    },
    [keys[17]]: {
      id: keys[17],
      name: 'postcode',
      question: 'What is your postcode?',
      childIds: []
    },
    [keys[18]]: {
      id: keys[18],
      name: 'country',
      question: 'What is your country?',
      childIds: []
    },
    [keys[19]]: {
      id: keys[19],
      name: 'latitude',
      question: 'What is the latitude of your location?',
      childIds: []
    },
    [keys[20]]: {
      id: keys[20],
      name: 'longitude',
      question: 'What is the longitude of your location?',
      childIds: []
    },
    [keys[21]]: {
      id: keys[21],
      name: 'coupon',
      question: 'Please provide any coupon code, or reply with \'none\'',
      childIds: []
    }
  }

  return {rootKey: keys[0], tree}
}
