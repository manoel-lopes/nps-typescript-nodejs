import nodemailer, { Transporter } from 'nodemailer'
import { resolve } from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

class SendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      // Create a SMTP(Simple Mail Transfer Protocol) transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  async exec(to: string, subject: string, body: string) {
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
    const templateFileContent = fs.readFileSync(npsPath).toString('utf-8')

    const mailTemplateParse = handlebars.compile(templateFileContent)

    const html = mailTemplateParse({
      name: to,
      title: subject,
      description: body
    })

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>'
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService()
