const sgMail = require('@sendgrid/mail');

//  emailOptions = {
//   to: 'test@example.com',                    // Change to your recipient
//   from: 'test@example.com',                  // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

module.exports.sendMail = options => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(options)
        .then(res => {
            console.log('mail sent successfully');
        })
        .catch(err => {
            console.log('error while sending mail: '+err);
        })
}