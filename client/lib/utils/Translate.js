import AWS from 'aws-sdk'

export default function translate(text, lang) {
  const translater = new AWS.Translate({
    accessKeyId: 'AKIA2QSCBNUKHINSTBNV',
    secretAccessKey: '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',
    region: 'eu-west-3',
  })

  const params = {
    SourceLanguageCode: 'fr',
    TargetLanguageCode: lang,
    Text: text,
  }

  return new Promise((resolve, reject) => {
    translater.translateText(params, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data.TranslatedText)
    })
  })
}
