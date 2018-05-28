const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid')

function saveOrder(request) {
  return docClient.put({
    TableName: 'pizza-orders',
    Item: {
      orderId: uuid(),
      pizza: request.pizza,
      address: request.address,
      status: 'pending'
    }
  }).promise()
    .then((res) => {
      console.log('Order is saved!', res)
      return res
    })
    .catch((saveError) => {
      console.log(`Oops, order is not saved :(`, saveError)
      throw saveError
    })
}

module.exports = saveOrder
