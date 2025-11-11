# Sora 2

> Image-to-video endpoint for Sora 2, OpenAI's state-of-the-art video model capable of creating richly detailed, dynamic clips with audio from natural language or images.

## Overview

- **Endpoint**: `https://fal.run/fal-ai/sora-2/image-to-video`
- **Model ID**: `fal-ai/sora-2/image-to-video`
- **Category**: image-to-video
- **Kind**: inference
  **Tags**: image-to-video, audio, sora

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping."

- **`resolution`** (`ResolutionEnum`, _optional_):
  The resolution of the generated video Default value: `"auto"`

  - Default: `"auto"`
  - Options: `"auto"`, `"720p"`

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video Default value: `"auto"`

  - Default: `"auto"`
  - Options: `"auto"`, `"9:16"`, `"16:9"`

- **`duration`** (`DurationEnum`, _optional_):
  Duration of the generated video in seconds Default value: `"4"`

  - Default: `4`
  - Options: `4`, `8`, `12`

- **`image_url`** (`string`, _required_):
  The URL of the image to use as the first frame
  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"

**Required Parameters Example**:

```json
{
  "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
}
```

**Full Example**:

```json
{
  "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
  "resolution": "auto",
  "aspect_ratio": "auto",
  "duration": 4,
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`VideoFile`, _required_):
  The generated video

  - Examples: {"content_type":"video/mp4","url":"https://storage.googleapis.com/falserverless/example_outputs/sora_2_i2v_output.mp4"}

- **`video_id`** (`string`, _required_):
  The ID of the generated video
  - Examples: "video_123"

**Example Response**:

```json
{
  "video": {
    "content_type": "video/mp4",
    "url": "https://storage.googleapis.com/falserverless/example_outputs/sora_2_i2v_output.mp4"
  },
  "video_id": "video_123"
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/sora-2/image-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
     "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/sora-2/image-to-video",
    arguments={
        "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
        "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/sora-2/image-to-video", {
  input: {
    prompt:
      "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
    image_url:
      "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png",
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/sora-2/image-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/sora-2/image-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sora-2/image-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Sora 2

> Image-to-video endpoint for Sora 2 Pro, OpenAI's state-of-the-art video model capable of creating richly detailed, dynamic clips with audio from natural language or images.

## Overview

- **Endpoint**: `https://fal.run/fal-ai/sora-2/image-to-video/pro`
- **Model ID**: `fal-ai/sora-2/image-to-video/pro`
- **Category**: image-to-video
- **Kind**: inference
  **Tags**: image-to-video, audio, sora-2-pro

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping."

- **`resolution`** (`ResolutionEnum`, _optional_):
  The resolution of the generated video Default value: `"auto"`

  - Default: `"auto"`
  - Options: `"auto"`, `"720p"`, `"1080p"`

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video Default value: `"auto"`

  - Default: `"auto"`
  - Options: `"auto"`, `"9:16"`, `"16:9"`

- **`duration`** (`DurationEnum`, _optional_):
  Duration of the generated video in seconds Default value: `"4"`

  - Default: `4`
  - Options: `4`, `8`, `12`

- **`image_url`** (`string`, _required_):
  The URL of the image to use as the first frame
  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"

**Required Parameters Example**:

```json
{
  "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
}
```

**Full Example**:

```json
{
  "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
  "resolution": "auto",
  "aspect_ratio": "auto",
  "duration": 4,
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`VideoFile`, _required_):
  The generated video

  - Examples: {"content_type":"video/mp4","url":"https://storage.googleapis.com/falserverless/example_outputs/sora-2-pro-i2v-output.mp4"}

- **`video_id`** (`string`, _required_):
  The ID of the generated video
  - Examples: "video_123"

**Example Response**:

```json
{
  "video": {
    "content_type": "video/mp4",
    "url": "https://storage.googleapis.com/falserverless/example_outputs/sora-2-pro-i2v-output.mp4"
  },
  "video_id": "video_123"
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/sora-2/image-to-video/pro \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
     "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/sora-2/image-to-video/pro",
    arguments={
        "prompt": "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
        "image_url": "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png"
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/sora-2/image-to-video/pro", {
  input: {
    prompt:
      "Front-facing 'invisible' action-cam on a skydiver in freefall above bright clouds; camera locked on his face. He speaks over the wind with clear lipsync: 'This is insanely fun! You've got to try it—book a tandem and go!' Natural wind roar, voice close-mic'd and slightly compressed so it's intelligible. Midday sun, goggles and jumpsuit flutter, altimeter visible, parachute rig on shoulders. Energetic but stable framing with subtle shake; brief horizon roll. End on first tug of canopy and wind noise dropping.",
    image_url:
      "https://storage.googleapis.com/falserverless/example_inputs/sora-2-i2v-input.png",
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/sora-2/image-to-video/pro)
- [API Documentation](https://fal.ai/models/fal-ai/sora-2/image-to-video/pro/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sora-2/image-to-video/pro)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Sora 2

> Text-to-video endpoint for Sora 2, OpenAI's state-of-the-art video model capable of creating richly detailed, dynamic clips with audio from natural language or images.

## Overview

- **Endpoint**: `https://fal.run/fal-ai/sora-2/text-to-video`
- **Model ID**: `fal-ai/sora-2/text-to-video`
- **Category**: text-to-video
- **Kind**: inference
  **Tags**: text to video, audio, sora

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"

- **`resolution`** (`ResolutionEnum`, _optional_):
  The resolution of the generated video Default value: `"720p"`

  - Default: `"720p"`
  - Options: `"720p"`

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video Default value: `"16:9"`

  - Default: `"16:9"`
  - Options: `"9:16"`, `"16:9"`

- **`duration`** (`DurationEnum`, _optional_):
  Duration of the generated video in seconds Default value: `"4"`
  - Default: `4`
  - Options: `4`, `8`, `12`

**Required Parameters Example**:

```json
{
  "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"
}
```

**Full Example**:

```json
{
  "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music",
  "resolution": "720p",
  "aspect_ratio": "16:9",
  "duration": 4
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`VideoFile`, _required_):
  The generated video

  - Examples: {"content_type":"video/mp4","url":"https://storage.googleapis.com/falserverless/example_outputs/sora_t2v_output.mp4"}

- **`video_id`** (`string`, _required_):
  The ID of the generated video
  - Examples: "video_123"

**Example Response**:

```json
{
  "video": {
    "content_type": "video/mp4",
    "url": "https://storage.googleapis.com/falserverless/example_outputs/sora_t2v_output.mp4"
  },
  "video_id": "video_123"
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/sora-2/text-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/sora-2/text-to-video",
    arguments={
        "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/sora-2/text-to-video", {
  input: {
    prompt:
      "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music",
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/sora-2/text-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/sora-2/text-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sora-2/text-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Sora 2

> Text-to-video endpoint for Sora 2 Pro, OpenAI's state-of-the-art video model capable of creating richly detailed, dynamic clips with audio from natural language or images.

## Overview

- **Endpoint**: `https://fal.run/fal-ai/sora-2/text-to-video/pro`
- **Model ID**: `fal-ai/sora-2/text-to-video/pro`
- **Category**: text-to-video
- **Kind**: inference
  **Tags**: text-to-video, audio, sora-2-pro

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"

- **`resolution`** (`ResolutionEnum`, _optional_):
  The resolution of the generated video Default value: `"1080p"`

  - Default: `"1080p"`
  - Options: `"720p"`, `"1080p"`

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video Default value: `"16:9"`

  - Default: `"16:9"`
  - Options: `"9:16"`, `"16:9"`

- **`duration`** (`DurationEnum`, _optional_):
  Duration of the generated video in seconds Default value: `"4"`
  - Default: `4`
  - Options: `4`, `8`, `12`

**Required Parameters Example**:

```json
{
  "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"
}
```

**Full Example**:

```json
{
  "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music",
  "resolution": "1080p",
  "aspect_ratio": "16:9",
  "duration": 4
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`VideoFile`, _required_):
  The generated video

  - Examples: {"content_type":"video/mp4","url":"https://storage.googleapis.com/falserverless/example_outputs/sora-2-pro-t2v-output.mp4"}

- **`video_id`** (`string`, _required_):
  The ID of the generated video
  - Examples: "video_123"

**Example Response**:

```json
{
  "video": {
    "content_type": "video/mp4",
    "url": "https://storage.googleapis.com/falserverless/example_outputs/sora-2-pro-t2v-output.mp4"
  },
  "video_id": "video_123"
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/sora-2/text-to-video/pro \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/sora-2/text-to-video/pro",
    arguments={
        "prompt": "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music"
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/sora-2/text-to-video/pro", {
  input: {
    prompt:
      "A dramatic Hollywood breakup scene at dusk on a quiet suburban street. A man and a woman in their 30s face each other, speaking softly but emotionally, lips syncing to breakup dialogue. Cinematic lighting, warm sunset tones, shallow depth of field, gentle breeze moving autumn leaves, realistic natural sound, no background music",
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/sora-2/text-to-video/pro)
- [API Documentation](https://fal.ai/models/fal-ai/sora-2/text-to-video/pro/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sora-2/text-to-video/pro)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Sora 2

> Video-to-video remix endpoint for Sora 2, OpenAI’s advanced model that transforms existing videos based on new text or image prompts allowing rich edits, style changes, and creative reinterpretations while preserving motion and structure

## Overview

- **Endpoint**: `https://fal.run/fal-ai/sora-2/video-to-video/remix`
- **Model ID**: `fal-ai/sora-2/video-to-video/remix`
- **Category**: video-to-video
- **Kind**: inference
  **Tags**: video to video, audio, sora,

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`video_id`** (`string`, _required_):
  The video_id from a previous Sora 2 generation. Note: You can only remix videos that were generated by Sora (via text-to-video or image-to-video endpoints), not arbitrary uploaded videos.

  - Examples: "video_123"

- **`prompt`** (`string`, _required_):
  Updated text prompt that directs the remix generation
  - Examples: "Change the cat's fur color to purple."

**Required Parameters Example**:

```json
{
  "video_id": "video_123",
  "prompt": "Change the cat's fur color to purple."
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`VideoFile`, _required_):
  The generated video

  - Examples: {"content_type":"video/mp4","url":"https://v3b.fal.media/files/b/rabbit/nk1MK6LY90QqScvI4_Yn8.mp4"}

- **`video_id`** (`string`, _required_):
  The ID of the generated video
  - Examples: "video_123"

**Example Response**:

```json
{
  "video": {
    "content_type": "video/mp4",
    "url": "https://v3b.fal.media/files/b/rabbit/nk1MK6LY90QqScvI4_Yn8.mp4"
  },
  "video_id": "video_123"
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/sora-2/video-to-video/remix \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "video_id": "video_123",
     "prompt": "Change the cat's fur color to purple."
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/sora-2/video-to-video/remix",
    arguments={
        "video_id": "video_123",
        "prompt": "Change the cat's fur color to purple."
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/sora-2/video-to-video/remix", {
  input: {
    video_id: "video_123",
    prompt: "Change the cat's fur color to purple.",
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/sora-2/video-to-video/remix)
- [API Documentation](https://fal.ai/models/fal-ai/sora-2/video-to-video/remix/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/sora-2/video-to-video/remix)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)
