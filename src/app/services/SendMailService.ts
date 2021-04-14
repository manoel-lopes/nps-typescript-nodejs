import nodemailer, { Transporter } from 'nodemailer'
import fs from 'fs'
import handlebars from 'handlebars'

type Mail = {
  name: string
  title: string
  description: string
  id: string
  link: string
}

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

  async exec(to: string, subject: string, variables: Mail, path: string) {

    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const mailTemplateParse = handlebars.compile(templateFileContent)

    const html = mailTemplateParse(variables)

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
