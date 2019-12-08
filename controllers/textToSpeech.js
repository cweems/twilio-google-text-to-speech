const textToSpeech = require('@google-cloud/text-to-speech');
const { Storage } = require('@google-cloud/storage');


const fs = require('fs');
const util = require('util');
const path = require('path');

const options = {
    keyFilename: path.join(__dirname, "../", 'gcloud-key.json')
}


const client = new textToSpeech.TextToSpeechClient(options);
const storage = new Storage(options);

module.exports = async function(text, languageCode, ssmlGender, name) {

    const request = {
        input: { text: text },
        voice: {
            languageCode: languageCode,
            ssmlGender: ssmlGender,
            name: name
        },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

    const [response] = await client.synthesizeSpeech(request);

    const fileName = `${Date.now()}-text-to-speech.mp3`;

    const file = bucket.file(fileName);
    
    const stream = file.createWriteStream({
        metadata: {
            contentType: 'audio/mpeg'
        },
        gzip: true
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(`Audio content written to file: https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}/${fileName}`);
    });

    stream.end(response.audioContent)
    return `https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}/${fileName}`;
}