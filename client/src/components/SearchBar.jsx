import React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import AWS from 'aws-sdk'
import TranscribeService from 'aws-sdk/clients/transcribeservice'
import {
  TranscribeClient,
  ListTranscriptionJobsCommand,
  DeleteTranscriptionJobCommand,
} from '@aws-sdk/client-transcribe'

import styles from '../../assets/styles/styles'
import { Button } from 'react-native-elements'

export default function SearchBar() {
  const [placeholder, setPlaceholder] = React.useState('')
  const [transcribe, setTranscribe] = React.useState('')

  const amazon = {
    logs: {
      credentials: {
        accessKeyId: 'AKIA2QSCBNUKHINSTBNV',
        secretAccessKey: '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',
      },
      region: 'eu-west-3',
    },
    s3params: {
      Bucket: 'transcribe-voice-bucket',
      Key: 'voiceTranscript.json',
    },
    jobName: 'voiceTranscript',
  }

  const uploadAudio = async () => {
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: 'AKIA2QSCBNUKHINSTBNV',
        secretAccessKey: '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',
      },
      region: 'us-east-1',
    })

    const payload = {
      key: 'NameOfFile_1234.wav',
      Bucket: 'transcribe-voice-bucket',
      /* Body: '<file-blob-which-is-recieved-from-client-side>', */
      ContentType: 'audio/wav', // this would be according to file
    }

    await new Promise((resolve, reject) => {
      s3.upload(payload, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.Location)
        }
      })
    })
  }

  const getJobsList = async () => {
    const client = new TranscribeClient(amazon.logs)
    const params = {
      JobNameContains: amazon.jobName,
    }

    return new Promise(async (resolve, reject) => {
      await client
        .send(new ListTranscriptionJobsCommand(params))
        .then(data => {
          resolve({ jobs: data.TranscriptionJobSummaries })
        })
        .catch(error => {
          reject({ error })
        })
    })
  }

  const deleteJob = async () => {
    const client = new TranscribeClient(amazon.logs)
    const params = {
      TranscriptionJobName: amazon.jobName,
    }

    return new Promise(async (resolve, reject) => {
      await client
        .send(new DeleteTranscriptionJobCommand(params))
        .then(() => {
          resolve({ message: 'Done.' })
        })
        .catch(error => {
          reject({ error })
        })
    })
  }

  const jobIsCompleted = async () => {
    const list = await getJobsList()
    const result = list.jobs?.find(job => job.TranscriptionJobName == amazon.jobName)

    if (result) {
      return result.TranscriptionJobStatus == 'COMPLETED'
    }
  }

  const transcribeAudio = async () => {
    const transcribeService = new TranscribeService(amazon.logs)

    const params = {
      TranscriptionJobName: amazon.jobName,
      Media: {
        MediaFileUri: 's3://transcribe-audios-bucket/record.wav',
      },
      MediaFormat: 'wav',
      OutputBucketName: amazon.s3params.Bucket,
      LanguageCode: 'fr-FR', // english india or use en-US for US
    }

    const isCompleted = await jobIsCompleted(amazon.jobName)

    if (isCompleted) {
      deleteJob(amazon.jobName)
    }

    await new Promise((resolve, reject) => {
      transcribeService.startTranscriptionJob(params, function (err, data) {
        if (err) {
          reject(err)
        } // an error occurred
        else {
          resolve(data)
        }
      })
    })

    /* setTimeout(() => getTranscript(), 5000) */
  }

  const getTranscript = async () => {
    const s3 = new AWS.S3(amazon.logs)

    const transcripts = await new Promise((resolve, reject) => {
      s3.getObject(amazon.s3params, function (err, data) {
        if (err) {
          reject(err)
        } else {
          // this could contain multiple transcripts
          // successful response
          resolve(JSON.parse(data.Body.toString()).results.transcripts)
        }
      })
    })

    // fetch and concat all transcripts
    let finalTranscript = ''
    transcripts.forEach(transcriptObject => {
      finalTranscript = finalTranscript + transcriptObject.transcript
    })

    /* console.log(finalTranscript) */
    setTranscribe(finalTranscript)
  }

  function LeftIcons() {
    return (
      <View style={[styles.flexItems, styles.wfull, styles.hfull, { bottom: 5 }]}>
        <Button buttonStyle={styles.bgTransparent} icon={<Icon name="search" size={24} color="#000" />} />
        <Button
          buttonStyle={styles.bgTransparent}
          icon={<Icon name="microphone" onPress={() => getTranscript()} size={24} color="#000" />}
        />
      </View>
    )
  }

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <Input placeholder="Search" rightIcon={<LeftIcons />} style={{ marginBottom: 8 }} />
      </View>
    </View>
  )
}
