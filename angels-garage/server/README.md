Contact server

This small Express server accepts POST /api/contact and forwards the message to the admin email using SMTP (nodemailer).

Environment variables required:

- SMTP_HOST - SMTP host
- SMTP_PORT - SMTP port (465 for secure SMTP)
- SMTP_USER - SMTP username
- SMTP_PASS - SMTP password
- ADMIN_EMAIL - recipient admin email address

Run server:

Set env vars and run:

```powershell
$env:SMTP_HOST = 'smtp.example.com'
$env:SMTP_PORT = '465'
$env:SMTP_USER = 'user@example.com'
$env:SMTP_PASS = 'password'
$env:ADMIN_EMAIL = 'admin@example.com'
node server/index.js
```

The front-end `Contact` form will POST to `/api/contact` and still open WhatsApp as a fallback.
