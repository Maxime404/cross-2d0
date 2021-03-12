import React from 'react'
import { Text } from 'react-native'
import AWS from 'aws-sdk'

export default function TranslatableText(props) {
  const [text, setText] = React.useState('')

  function translate() {
    const translater = new AWS.Translate({
      accessKeyId: 'AKIA2QSCBNUKHINSTBNV',
      secretAccessKey: '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',
      region: 'eu-west-3',
    })

    const params = {
      SourceLanguageCode: 'fr',
      TargetLanguageCode: props.lang,
      Text: props.children,
    }

    translater.translateText(params, (err, data) => {
      if (err) {
        return err
      }
      setText(data.TranslatedText)
    })
  }

  React.useEffect(() => {
    translate()
  }, [])

  return <Text style={props.style ? props.style : {}}>{text}</Text>
}
