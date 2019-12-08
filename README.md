# Google Text to Speech Service for Twilio
Extends Twilio's text to speech capabilities with Google Cloud Text to Speech.

# Setup

## Prerequisites
1. Install the Google Cloud SDK: `brew cask install google-cloud-sdk`
1. Install gsutil: https://cloud.google.com/storage/docs/gsutil_install

1. Authenticate gcloud cli tool: `gcloud auth login`
1. Create a project: `gcloud projects create [PROJECT_NAME]`
1. Check project was created: `gcloud projects describe [PROJECT_ID]`
1. Create a cloud storage bucket: `gsutil mb -p [PROJECT_NAME] gs://[BUCKET_NAME]`
1. Make cloud storage bucket publicly accessible: `gsutil defacl set public-read gs://[BUCKET_NAME]`

# Run Locally
1. Clone the repo: `git clone [repo]`
1. Go into repo directory: `cd gcp-tts`
1. Copy `.env.sample` to `.env` and specify `GCLOUD_STORAGE_BUCKET` and `API_KEY`
1. Copy `app.yaml.sample` to `app.yaml` and specify `GCLOUD_STORAGE_BUCKET` and `API_KEY`
1. Install dependencies: `npm install`
1. Start local server: `npm start`

## Deploy
1. Create an AppEngine app: `gcloud app create --project=[PROJECT_NAME]`
1. gcloud app deploy --project=[PROJECT_NAME]

# Usage:

Make `POST` requests to https://[APP_NAME].appspot.com with the following parameters:

```
{
	"text": "Text to be recorded to speech file.",
	"languageCode": "One of the languages from the list of [Supported Voices and Languages](https://cloud.google.com/text-to-speech/docs/voices). E.g. ar-XA",
	"ssmlGender": "NEUTRAL",
	"name": "One of the voice names from the list of [Supported Voices and Languages](https://cloud.google.com/text-to-speech/docs/voices). E.g. ar-XA-Standard-A",
	"apiKey": "Random string to include in requests. Set in .env and app.yaml files to verify requests."
}

```
Example request body:

```
{
	"text": "Nhiệm vụ của Lone Star Legal Aid là bảo vệ và nâng cao các quyền pháp lý dân sự của hàng triệu người dân Texas sống trong nghèo đói trong khu vực dịch vụ 76 quận của mình bằng cách vận động miễn phí, đại diện pháp lý và giáo dục cộng đồng để đảm bảo công bằng.",
	"languageCode": "vi-VN",
	"ssmlGender": "NEUTRAL",
	"name": "vi-VN-Standard-A",
	"apiKey": "atryfyjei3043094"
}
```