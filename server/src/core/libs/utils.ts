import chalk from 'chalk'
import moment from 'moment'
import path from 'path'
import dotenv from 'dotenv'
import { isEmpty } from 'lodash'
import { existsSync } from 'fs'
import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'
import User from '../db/models/User'

export const argv: string[] = process.argv.slice(2)

export function mlog(str: string, level = 'debug'): void {
  const colors = {
    debug: 'cyan',
    error: 'red',
    warning: 'yellow',
    success: 'green',
  }

  // @ts-ignore
  const display = chalk.bold[colors[level]](`${moment().format()} - ${str}`)
  console.log(display)
}

export function prelude(): void | never {
  const envPathName = path.join(process.cwd(), '.env')
  const appConfig = require(path.join(process.cwd(), 'app.config.json'))

  if (process.env.NODE_ENV === 'production' || existsSync(envPathName)) {
    dotenv.config()

    const missingValues = appConfig.env.filter((key: string) => process.env[key] === undefined)
    if (!isEmpty(missingValues)) {
      throw new Error(`Sorry [ ${missingValues.join(', ')}] value(s) are missings on your .env file`)
    }
  } else {
    throw new Error('Sorry your .env file is missing')
  }
}


export async function sendMail(user:User,sujet:string,body:string): Promise<void> | never {

  const transporter = await nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY as string
      })
    );
    // send mail with defined transport object
    await transporter.sendMail({
      from: `"MyS3-MJ Entertainment 💩" <${process.env.EMAIL_SENDER as string}>`, // sender address
      to: user.email, 
      subject: `${sujet} MYS3 SJ ✔`, 
      html: body, 
  }).catch((e) => {
    throw new Error(e)
  })
}

