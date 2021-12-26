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

## self note

* react official docs for backend related [topics](https://create-react-app.dev/docs/proxying-api-requests-in-development).
