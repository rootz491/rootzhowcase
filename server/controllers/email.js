const sgMail = require('@sendgrid/mail');

//  options = {
//   to: 'test@example.com',                    // Change to your recipient
//   from: 'test@example.com',                  // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

module.exports.sendVerificationMail = (email, token) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const link = `${process.env.HOST}/api/verification/${token}`;
    const options = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Verify your email',
        html: '<h2>welcome to project ROOTZSHOWCASE</h2><p>Hello, this email is sent from <b>rootzhowcase</b> application!</p><strong>Please click the link below to verify your email</strong><br><a href="' + link + '">' + link + '</a><br><p>Karan Sharma,<br>Thank you!</p>',
    };
    sgMail.send(options)
        .then(res => {
            console.log('mail sent successfully');
        })
        .catch(err => {
            console.log('error while sending mail: '+err);
        });
}

module.exports.sendPasswordResetMail = (email, token) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const link = `${process.env.HOST}/api/reset/${token}`;
    const options = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'reset your password',
        html: '<h2>welcome to project ROOTZSHOWCASE</h2><p>Hello, this email is sent from <b>rootzhowcase</b> application!</p><strong>Please go to below link to reset your password.</strong><br><a href="' + link + '">' + link + '</a><br><p>Karan Sharma,<br>Thank you!</p>',
    };
    sgMail.send(options)
        .then(res => {
            console.log('mail sent successfully');
        })
        .catch(err => {
            console.log('error while sending mail: '+err);
        });
}