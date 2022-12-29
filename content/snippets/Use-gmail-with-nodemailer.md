---
title: Use Gmail with Nodemailer
description: Here's how you can successfully use your Gmail account to send emails using Nodemailer.
tags: [nodemailer, gmail, nodejs, strapi, javascript]
createdAt: 2022-07-21T23:00:00.000Z
updatedAt: 2022-07-21T23:00:00.000Z
---


[Nodemailer](https://nodemailer.com/) is a [Node.js](https://nodejs.org/) module that prides itself as the solution most Node developers turn to by default for sending emails with Node.js and for good reason.
It's pretty easy to set up nodemailer to start sending emails due to [its features](https://nodemailer.com/about/#nodemailer-features).

Most times, you would need a pretty quick way to start sending emails in your Node application when you're building for development and that's where Gmail comes in.

## Configuring your Google account

To get Gmail working with nodemailer, most times, all you have to do is configure your google account by allowing access to "less secure apps" from the [security](https://www.google.com/settings/security/lesssecureapps).

With this enabled, you could use your Google email address and password for nodemailer and start sending emails right away.

<img-cont src="https://i.imgur.com/D8LkUe5.png" alt="Less secure app access" ></img-cont>

Unfortunately, [this setting is no longer available after May 30th, 2022](https://support.google.com/accounts/answer/6010255?hl=en). This means that when you go back to [your account settings](https://www.google.com/settings/security/lesssecureapps)), you should see this:

<img-cont src="https://i.imgur.com/CG452Ms.png" alt="Less secure app access settings no longer available" ></img-cont>

*Be not dismayed* though, thanks to [this StackOverflow answer](https://stackoverflow.com/a/72477193/12654375) I stumbled on recently, there's a way out.
All we need to do now is generate an app password for our google account. We can generate multiple app passwords. These app passwords are usually required when you need to set up and use a third-party email client like Outlook to view emails from your Gmail account.

### Enable 2-Step Verification

To generate app passwords, we first have to [enable 2-Step Verification on our Google account](https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome).

Go to your [Google account security settings](https://myaccount.google.com/security) and enable 2-Step Verification.

<img-cont src="https://i.imgur.com/MO3uTSr.png" alt="2-Step Verification option in Google account" ></img-cont>

Once you've done that, you should see the app password option available as a sign-in option:

<img-cont src="https://i.imgur.com/NUQTFba.png" alt="App passwords option available" ></img-cont>

Now, you can select the [App passwords option](https://myaccount.google.com/u/2/apppasswords) to set up a new app password.

In the *Select app* option, choose *Other (custom name)* and give it a name of your choice and click on *Generate*.
A 16-digit password will be shown once, you can copy it and keep it somewhere safe. This will be the new password you'll use for nodemailer.
Here's the one I generated:

<img-cont src="https://i.imgur.com/eWVmEk6.png" alt="Generated password" ></img-cont>

Awesome. Now you can proceed to use your email address and generated password to send emails with nodemailer.

## Setting up Nodemailer in a Node project

Here's a quick rundown of using nodemailer in a simple Node.js project.

### Installing Nodemailer

```bash
#npm
npm install nodemailer

#yarn
yarn add nodemailer
```

Once Nodemailer is installed, initialize it:

```javascript
const nodemailer = require('nodemailer');

// or for ES Modules:
import nodemailer from ‘nodemailer’;
```

### Using the Gmail transport service

Now we create a `transporter` with `gmail` and pass our email and generated password in the `auth` object:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hello@example.com',
    pass: 'generated password'
  }
});

const mailOptions = {
  from: 'hello@example.com',
  to: 'reciever@gmail.com',
  subject: 'Subject',
  text: 'Email content'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    // do something useful
  }
});
```

## Setting up Nodemailer as a plugin (Strapi)

I initially faced this issue when I was working on a project using Strapi so, here's how you can work it out.

You need to have the plugin `strapi-plugin-email-nodemailer` installed in your Strapi project.

### Installation

Install the plugin in your Strapi project

```bash
# yarn
yarn add strapi-provider-email-nodemailer

# npm
npm install strapi-provider-email-nodemailer --save
```

### Configure email plugin

Now, configure the email plugin. create the `./config/plugins.js` file in your Strapi project if you haven't already.

```javascript
// ./config/plugins.js

module.exports = ({ env }) => ({
    // ...
    email: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.example.com'),
          port: env('SMTP_PORT', 587),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: 'hello@example.com',
          defaultReplyTo: 'hello@example.com',
        },
    },
});
```

Then, in your `.env` file, enter the variables:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USERNAME=hello@example.com
SMTP_PASSWORD=generatedPassword
```

Alright. I hope you found this useful! Happy coding!

Thanks for reading ❤
