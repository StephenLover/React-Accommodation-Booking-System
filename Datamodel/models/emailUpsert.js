let EmailModel = require('./email')
let msg = new EmailModel({
  email: 'ADA.LOVELACE@GMAIL.COM'
})
msg.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })