import smtplib
from email.mime.text import MIMEText
import os


def send_customer_email(
    customer_email,
    customer_name,
    password
):
    sender = os.getenv("EMAIL_USER")
    app_password = os.getenv("EMAIL_PASSWORD")

    subject = "Udhar App Account Created"

    body = f"""
Hello {customer_name},

Your account has been created.

Email: {customer_email}
Password: {password}

Login URL:
http://localhost:3000/customer-login
"""

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = customer_email

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        sender,
        app_password
    )

    server.sendmail(
        sender,
        customer_email,
        msg.as_string()
    )

    server.quit()