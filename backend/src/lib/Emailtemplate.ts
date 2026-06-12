export const emailTemplate = (fullname: string, email: string, subject: string, messages: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background-color: #1a6b3c; padding: 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; text-transform: uppercase; color: #888; font-weight: bold; margin-bottom: 4px; }
    .value { font-size: 15px; color: #333; padding: 10px 14px; background: #f9f9f9; border-left: 4px solid #1a6b3c; border-radius: 4px; }
    .message-value { white-space: pre-wrap; line-height: 1.6; }
    .footer { background: #f4f4f4; padding: 16px; text-align: center; font-size: 12px; color: #aaa; }
    .reply-btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background-color: #1a6b3c; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📩 New Contact Message — Tourism Nepal</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${fullname}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-value">${messages}</div>
      </div>
      <a href="mailto:${email}" class="reply-btn">Reply to ${fullname}</a>
    </div>
    <div class="footer">
      This message was sent via the Tourism Nepal contact form.
    </div>
  </div>
</body>
</html>
`;