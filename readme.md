# rootzhowcase

This is a webapp for showing my projects, with a little twist of stripe api.

## Features

* normal user can view all of my projects.
* pro user can have source code of projects as well.
* user will have a payment option to become **pro** member (it'll be super cheap tho).

## current status

designs are in progress.

#   workflow 

1.  sign up
    * user can sign up with email, password and name
    * during signup, verification token will be generated and sent to user's email.
    * once user sign up, he will be asked to verify his email.
    * verification email will contain a link to verify his email via `/api/verification/{token}`
    * after verification, user will be able to login.
    > user can resend verification email via `/api/verification/resend`

2.  login
    * user can login with email and password
    * if user is not verified, he will be redirected to verification page.
    * if user is verified, he will be able to login.

3.  forget password
    * user will be asked to enter email to recover password via `/api/reset`
    * new reset token will be generated and email will be sent to user with password reset page link i.e. `/api/reset/{token}`
    * `/api/reset/{token}` will contain a form to reset password.
        * check if token is from valid user and is not expired.
    * post req to `/api/reset/{token}` with **new_password** will reset password.
    * after reset, user will be able to login.

4.  become pro member
    * user can become pro member by paying **rs. 50** via stripe at `/api/payment`.
    * after payment, event will be triggered from stripe which will indicate that payment is successful.
    * [POST] `/api/payment` will listen for this event and then perform action i.e. make user a pro member.
    * now user will be able to download all of my projects' source code.

## testing

setup dev server
* run backend server
```
cd server
npm run dev
```

* start stripe event listener
```
stripe listen --forward-to http://localhost:1337/api/payment
```

* now try making payment or something, it should work 😅.


## self note

* react official docs for backend related [topics](https://create-react-app.dev/docs/proxying-api-requests-in-development).
* stripe customer docs [here](https://stripe.com/docs/api/customers?lang=node).
* stripe checkout session docs [here](https://stripe.com/docs/api/checkout/sessions?lang=node).
