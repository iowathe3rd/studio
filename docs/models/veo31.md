# Veo 3.1

> Veo 3.1 by Google, the most advanced AI video generation model in the world. With sound on!

## Overview

- **Endpoint**: `https://fal.run/fal-ai/veo3.1`
- **Model ID**: `fal-ai/veo3.1`
- **Category**: text-to-video
- **Kind**: inference

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "Two person street interview in New York City.\nSample Dialogue:\nHost: \"Did you hear the news?\"\nPerson: \"Yes! Veo 3.1 is now available on fal. If you want to see it, go check their website.\""

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video. If it is set to 1:1, the video will be outpainted. Default value: `"16:9"`

  - Default: `"16:9"`
  - Options: `"9:16"`, `"16:9"`, `"1:1"`

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"8s"`

  - Default: `"8s"`
  - Options: `"4s"`, `"6s"`, `"8s"`

- **`negative_prompt`** (`string`, _optional_):
  A negative prompt to guide the video generation

- **`enhance_prompt`** (`boolean`, _optional_):
  Whether to enhance the video generation Default value: `true`

  - Default: `true`

- **`seed`** (`integer`, _optional_):
  A seed to use for the video generation

- **`auto_fix`** (`boolean`, _optional_):
  Whether to automatically attempt to fix prompts that fail content policy or other validation checks by rewriting them Default value: `true`

  - Default: `true`

- **`resolution`** (`ResolutionEnum`, _optional_):
  The resolution of the generated video Default value: `"720p"`

  - Default: `"720p"`
  - Options: `"720p"`, `"1080p"`

- **`generate_audio`** (`boolean`, _optional_):
  Whether to generate audio for the video. If false, 50% less credits will be used. Default value: `true`
  - Default: `true`

**Required Parameters Example**:

```json
{
  "prompt": "Two person street interview in New York City.\nSample Dialogue:\nHost: \"Did you hear the news?\"\nPerson: \"Yes! Veo 3.1 is now available on fal. If you want to see it, go check their website.\""
}
```

**Full Example**:

```json
{
  "prompt": "Two person street interview in New York City.\nSample Dialogue:\nHost: \"Did you hear the news?\"\nPerson: \"Yes! Veo 3.1 is now available on fal. If you want to see it, go check their website.\"",
  "aspect_ratio": "16:9",
  "duration": "8s",
  "enhance_prompt": true,
  "auto_fix": true,
  "resolution": "720p",
  "generate_audio": true
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://v3b.fal.media/files/b/kangaroo/oUCiZjQwEy6bIQdPUSLDF_output.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://v3b.fal.media/files/b/kangaroo/oUCiZjQwEy6bIQdPUSLDF_output.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/veo3.1 \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "Two person street interview in New York City.\nSample Dialogue:\nHost: \"Did you hear the news?\"\nPerson: \"Yes! Veo 3.1 is now available on fal. If you want to see it, go check their website.\""
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
    "fal-ai/veo3.1",
    arguments={
        "prompt": "Two person street interview in New York City.
    Sample Dialogue:
    Host: \"Did you hear the news?\"
    Person: \"Yes! Veo 3.1 is now available on fal. If you want to see it, go check their website.\""
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

const result = await fal.subscribe("fal-ai/veo3.1", {
  input: {
    prompt: "Two person street interview in New York City.
  Sample Dialogue:
  Host: \"Did you hear the news?\"
  Person: \"Yes! Veo 3.1 is now available on fal. If you want to see it, go check their website.\""
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

- [Model Playground](https://fal.ai/models/fal-ai/veo3.1)
- [API Documentation](https://fal.ai/models/fal-ai/veo3.1/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Veo 3.1 Fast

> Faster and more cost effective version of Google's Veo 3.1!

## Overview

- **Endpoint**: `https://fal.run/fal-ai/veo3.1/fast`
- **Model ID**: `fal-ai/veo3.1/fast`
- **Category**: text-to-video
- **Kind**: inference

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good."

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video. If it is set to 1:1, the video will be outpainted. Default value: `"16:9"`

  - Default: `"16:9"`
  - Options: `"9:16"`, `"16:9"`, `"1:1"`

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"8s"`

  - Default: `"8s"`
  - Options: `"4s"`, `"6s"`, `"8s"`

- **`negative_prompt`** (`string`, _optional_):
  A negative prompt to guide the video generation

- **`enhance_prompt`** (`boolean`, _optional_):
  Whether to enhance the video generation Default value: `true`

  - Default: `true`

- **`seed`** (`integer`, _optional_):
  A seed to use for the video generation

- **`auto_fix`** (`boolean`, _optional_):
  Whether to automatically attempt to fix prompts that fail content policy or other validation checks by rewriting them Default value: `true`

  - Default: `true`

- **`resolution`** (`ResolutionEnum`, _optional_):
  The resolution of the generated video Default value: `"720p"`

  - Default: `"720p"`
  - Options: `"720p"`, `"1080p"`

- **`generate_audio`** (`boolean`, _optional_):
  Whether to generate audio for the video. If false, 33% less credits will be used. Default value: `true`
  - Default: `true`

**Required Parameters Example**:

```json
{
  "prompt": "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good."
}
```

**Full Example**:

```json
{
  "prompt": "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good.",
  "aspect_ratio": "16:9",
  "duration": "8s",
  "enhance_prompt": true,
  "auto_fix": true,
  "resolution": "720p",
  "generate_audio": true
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://v3b.fal.media/files/b/kangaroo/oUCiZjQwEy6bIQdPUSLDF_output.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://v3b.fal.media/files/b/kangaroo/oUCiZjQwEy6bIQdPUSLDF_output.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/veo3.1/fast \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good."
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
    "fal-ai/veo3.1/fast",
    arguments={
        "prompt": "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good."
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

const result = await fal.subscribe("fal-ai/veo3.1/fast", {
  input: {
    prompt:
      "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good.",
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

- [Model Playground](https://fal.ai/models/fal-ai/veo3.1/fast)
- [API Documentation](https://fal.ai/models/fal-ai/veo3.1/fast/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1/fast)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Veo 3.1 Fast

> Generate videos from a first/last frame using Google's Veo 3.1 Fast

## Overview

- **Endpoint**: `https://fal.run/fal-ai/veo3.1/fast/first-last-frame-to-video`
- **Model ID**: `fal-ai/veo3.1/fast/first-last-frame-to-video`
- **Category**: image-to-video
- **Kind**: inference

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`first_frame_url`** (`string`, _required_):
  URL of the first frame of the video

  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg"

- **`last_frame_url`** (`string`, _required_):
  URL of the last frame of the video

  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg"

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"8s"`

  - Default: `"8s"`
  - Options: `"4s"`, `"6s"`, `"8s"`

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  Aspect ratio of the generated video Default value: `"auto"`

  - Default: `"auto"`
  - Options: `"auto"`, `"9:16"`, `"16:9"`, `"1:1"`

- **`resolution`** (`ResolutionEnum`, _optional_):
  Resolution of the generated video Default value: `"720p"`

  - Default: `"720p"`
  - Options: `"720p"`, `"1080p"`

- **`generate_audio`** (`boolean`, _optional_):
  Whether to generate audio for the video. If false, 33% less credits will be used. Default value: `true`
  - Default: `true`

**Required Parameters Example**:

```json
{
  "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
  "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
  "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""
}
```

**Full Example**:

```json
{
  "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
  "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
  "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\"",
  "duration": "8s",
  "aspect_ratio": "auto",
  "resolution": "720p",
  "generate_audio": true
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://storage.googleapis.com/falserverless/example_outputs/veo31-flf2v-output.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://storage.googleapis.com/falserverless/example_outputs/veo31-flf2v-output.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/veo3.1/fast/first-last-frame-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
     "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
     "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""
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
    "fal-ai/veo3.1/fast/first-last-frame-to-video",
    arguments={
        "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
        "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
        "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""
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

const result = await fal.subscribe(
  "fal-ai/veo3.1/fast/first-last-frame-to-video",
  {
    input: {
      first_frame_url:
        "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
      last_frame_url:
        "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
      prompt:
        'A woman looks into the camera, breathes in, then exclaims energetically, "have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It\'s incredible!"',
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  }
);
console.log(result.data);
console.log(result.requestId);
```

## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/veo3.1/fast/first-last-frame-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/veo3.1/fast/first-last-frame-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1/fast/first-last-frame-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Veo 3.1 Fast

> Generate videos from your image prompts using Veo 3.1 fast.

## Overview

- **Endpoint**: `https://fal.run/fal-ai/veo3.1/fast/image-to-video`
- **Model ID**: `fal-ai/veo3.1/fast/image-to-video`
- **Category**: image-to-video
- **Kind**: inference

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing how the image should be animated

  - Examples: "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3 Image-to-Video on Fal? It's incredible!\""

- **`image_url`** (`string`, _required_):
  URL of the input image to animate. Should be 720p or higher resolution in 16:9 or 9:16 aspect ratio. If the image is not in 16:9 or 9:16 aspect ratio, it will be cropped to fit.

  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/veo3-i2v-input.png"

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video Default value: `"auto"`

  - Default: `"auto"`
  - Options: `"auto"`, `"9:16"`, `"16:9"`, `"1:1"`

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"8s"`

  - Default: `"8s"`
  - Options: `"4s"`, `"6s"`, `"8s"`

- **`generate_audio`** (`boolean`, _optional_):
  Whether to generate audio for the video. If false, 33% less credits will be used. Default value: `true`

  - Default: `true`

- **`resolution`** (`ResolutionEnum`, _optional_):
  Resolution of the generated video Default value: `"720p"`
  - Default: `"720p"`
  - Options: `"720p"`, `"1080p"`

**Required Parameters Example**:

```json
{
  "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3 Image-to-Video on Fal? It's incredible!\"",
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/veo3-i2v-input.png"
}
```

**Full Example**:

```json
{
  "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3 Image-to-Video on Fal? It's incredible!\"",
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/veo3-i2v-input.png",
  "aspect_ratio": "auto",
  "duration": "8s",
  "generate_audio": true,
  "resolution": "720p"
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://storage.googleapis.com/falserverless/model_tests/gallery/veo3-1-i2v.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://storage.googleapis.com/falserverless/model_tests/gallery/veo3-1-i2v.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/veo3.1/fast/image-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3 Image-to-Video on Fal? It's incredible!\"",
     "image_url": "https://storage.googleapis.com/falserverless/example_inputs/veo3-i2v-input.png"
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
    "fal-ai/veo3.1/fast/image-to-video",
    arguments={
        "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3 Image-to-Video on Fal? It's incredible!\"",
        "image_url": "https://storage.googleapis.com/falserverless/example_inputs/veo3-i2v-input.png"
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

const result = await fal.subscribe("fal-ai/veo3.1/fast/image-to-video", {
  input: {
    prompt:
      'A woman looks into the camera, breathes in, then exclaims energetically, "have you guys checked out Veo3 Image-to-Video on Fal? It\'s incredible!"',
    image_url:
      "https://storage.googleapis.com/falserverless/example_inputs/veo3-i2v-input.png",
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

- [Model Playground](https://fal.ai/models/fal-ai/veo3.1/fast/image-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/veo3.1/fast/image-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1/fast/image-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Veo 3.1

> Generate videos from a first and last framed using Google's Veo 3.1

## Overview

- **Endpoint**: `https://fal.run/fal-ai/veo3.1/first-last-frame-to-video`
- **Model ID**: `fal-ai/veo3.1/first-last-frame-to-video`
- **Category**: image-to-video
- **Kind**: inference

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`first_frame_url`** (`string`, _required_):
  URL of the first frame of the video

  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg"

- **`last_frame_url`** (`string`, _required_):
  URL of the last frame of the video

  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg"

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"8s"`

  - Default: `"8s"`
  - Options: `"4s"`, `"6s"`, `"8s"`

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  Aspect ratio of the generated video Default value: `"auto"`

  - Default: `"auto"`
  - Options: `"auto"`, `"9:16"`, `"16:9"`, `"1:1"`

- **`resolution`** (`ResolutionEnum`, _optional_):
  Resolution of the generated video Default value: `"720p"`

  - Default: `"720p"`
  - Options: `"720p"`, `"1080p"`

- **`generate_audio`** (`boolean`, _optional_):
  Whether to generate audio for the video. If false, 50% less credits will be used. Default value: `true`
  - Default: `true`

**Required Parameters Example**:

```json
{
  "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
  "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
  "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""
}
```

**Full Example**:

```json
{
  "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
  "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
  "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\"",
  "duration": "8s",
  "aspect_ratio": "auto",
  "resolution": "720p",
  "generate_audio": true
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://storage.googleapis.com/falserverless/example_outputs/veo31-flf2v-output.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://storage.googleapis.com/falserverless/example_outputs/veo31-flf2v-output.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/veo3.1/first-last-frame-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
     "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
     "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""
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
    "fal-ai/veo3.1/first-last-frame-to-video",
    arguments={
        "first_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
        "last_frame_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
        "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, \"have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It's incredible!\""
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

const result = await fal.subscribe("fal-ai/veo3.1/first-last-frame-to-video", {
  input: {
    first_frame_url:
      "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
    last_frame_url:
      "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
    prompt:
      'A woman looks into the camera, breathes in, then exclaims energetically, "have you guys checked out Veo3.1 First-Last-Frame-to-Video on Fal? It\'s incredible!"',
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

- [Model Playground](https://fal.ai/models/fal-ai/veo3.1/first-last-frame-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/veo3.1/first-last-frame-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1/first-last-frame-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Veo 3.1

> Veo 3.1 is the latest state-of-the art video generation model from Google DeepMind

## Overview

- **Endpoint**: `https://fal.run/fal-ai/veo3.1/image-to-video`
- **Model ID**: `fal-ai/veo3.1/image-to-video`
- **Category**: image-to-video
- **Kind**: inference

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "A monkey and polar bear host a casual podcast about AI inference, bringing their unique perspectives from different environments (tropical vs. arctic) to discuss how AI systems make decisions and process information.\nSample Dialogue:\nMonkey (Banana): \"Welcome back to Bananas & Ice! I am Banana\"\nPolar Bear (Ice): \"And I'm Ice!\""

- **`image_url`** (`string`, _required_):
  URL of the input image to animate. Should be 720p or higher resolution in 16:9 or 9:16 aspect ratio. If the image is not in 16:9 or 9:16 aspect ratio, it will be cropped to fit.

  - Examples: "https://v3b.fal.media/files/b/elephant/eeZYKGpxiSM7BInbOEx8n_f90f0805d51f4dd0b5c95eabb7b294e5.jpg"

- **`aspect_ratio`** (`AspectRatioEnum`, _optional_):
  The aspect ratio of the generated video. Only 16:9 and 9:16 are supported. Default value: `"16:9"`

  - Default: `"16:9"`
  - Options: `"9:16"`, `"16:9"`

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"8s"`

  - Default: `"8s"`
  - Options: `"4s"`, `"6s"`, `"8s"`

- **`generate_audio`** (`boolean`, _optional_):
  Whether to generate audio for the video. If false, 50% less credits will be used. Default value: `true`

  - Default: `true`

- **`resolution`** (`ResolutionEnum`, _optional_):
  Resolution of the generated video Default value: `"720p"`
  - Default: `"720p"`
  - Options: `"720p"`, `"1080p"`

**Required Parameters Example**:

```json
{
  "prompt": "A monkey and polar bear host a casual podcast about AI inference, bringing their unique perspectives from different environments (tropical vs. arctic) to discuss how AI systems make decisions and process information.\nSample Dialogue:\nMonkey (Banana): \"Welcome back to Bananas & Ice! I am Banana\"\nPolar Bear (Ice): \"And I'm Ice!\"",
  "image_url": "https://v3b.fal.media/files/b/elephant/eeZYKGpxiSM7BInbOEx8n_f90f0805d51f4dd0b5c95eabb7b294e5.jpg"
}
```

**Full Example**:

```json
{
  "prompt": "A monkey and polar bear host a casual podcast about AI inference, bringing their unique perspectives from different environments (tropical vs. arctic) to discuss how AI systems make decisions and process information.\nSample Dialogue:\nMonkey (Banana): \"Welcome back to Bananas & Ice! I am Banana\"\nPolar Bear (Ice): \"And I'm Ice!\"",
  "image_url": "https://v3b.fal.media/files/b/elephant/eeZYKGpxiSM7BInbOEx8n_f90f0805d51f4dd0b5c95eabb7b294e5.jpg",
  "aspect_ratio": "16:9",
  "duration": "8s",
  "generate_audio": true,
  "resolution": "720p"
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://storage.googleapis.com/falserverless/model_tests/gallery/veo3-1-i2v.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://storage.googleapis.com/falserverless/model_tests/gallery/veo3-1-i2v.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/veo3.1/image-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "A monkey and polar bear host a casual podcast about AI inference, bringing their unique perspectives from different environments (tropical vs. arctic) to discuss how AI systems make decisions and process information.\nSample Dialogue:\nMonkey (Banana): \"Welcome back to Bananas & Ice! I am Banana\"\nPolar Bear (Ice): \"And I'm Ice!\"",
     "image_url": "https://v3b.fal.media/files/b/elephant/eeZYKGpxiSM7BInbOEx8n_f90f0805d51f4dd0b5c95eabb7b294e5.jpg"
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
    "fal-ai/veo3.1/image-to-video",
    arguments={
        "prompt": "A monkey and polar bear host a casual podcast about AI inference, bringing their unique perspectives from different environments (tropical vs. arctic) to discuss how AI systems make decisions and process information.
    Sample Dialogue:
    Monkey (Banana): \"Welcome back to Bananas & Ice! I am Banana\"
    Polar Bear (Ice): \"And I'm Ice!\"",
        "image_url": "https://v3b.fal.media/files/b/elephant/eeZYKGpxiSM7BInbOEx8n_f90f0805d51f4dd0b5c95eabb7b294e5.jpg"
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

const result = await fal.subscribe("fal-ai/veo3.1/image-to-video", {
  input: {
    prompt: "A monkey and polar bear host a casual podcast about AI inference, bringing their unique perspectives from different environments (tropical vs. arctic) to discuss how AI systems make decisions and process information.
  Sample Dialogue:
  Monkey (Banana): \"Welcome back to Bananas & Ice! I am Banana\"
  Polar Bear (Ice): \"And I'm Ice!\"",
    image_url: "https://v3b.fal.media/files/b/elephant/eeZYKGpxiSM7BInbOEx8n_f90f0805d51f4dd0b5c95eabb7b294e5.jpg"
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

- [Model Playground](https://fal.ai/models/fal-ai/veo3.1/image-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/veo3.1/image-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1/image-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Veo 3.1

> Generate Videos from images using Google's Veo 3.1

## Overview

- **Endpoint**: `https://fal.run/fal-ai/veo3.1/reference-to-video`
- **Model ID**: `fal-ai/veo3.1/reference-to-video`
- **Category**: image-to-video
- **Kind**: inference

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`image_urls`** (`list<string>`, _required_):
  URLs of the reference images to use for consistent subject appearance

  - Array of string
  - Examples: ["https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png","https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png","https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png"]

- **`prompt`** (`string`, _required_):
  The text prompt describing the video you want to generate

  - Examples: "A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow."

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"8s"`

  - Default: `"8s"`
  - Options: `"8s"`

- **`resolution`** (`ResolutionEnum`, _optional_):
  Resolution of the generated video Default value: `"720p"`

  - Default: `"720p"`
  - Options: `"720p"`, `"1080p"`

- **`generate_audio`** (`boolean`, _optional_):
  Whether to generate audio for the video. If false, 50% less credits will be used. Default value: `true`
  - Default: `true`

**Required Parameters Example**:

```json
{
  "image_urls": [
    "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png",
    "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png",
    "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png"
  ],
  "prompt": "A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow."
}
```

**Full Example**:

```json
{
  "image_urls": [
    "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png",
    "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png",
    "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png"
  ],
  "prompt": "A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow.",
  "duration": "8s",
  "resolution": "720p",
  "generate_audio": true
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://storage.googleapis.com/falserverless/example_outputs/veo31-r2v-output.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://storage.googleapis.com/falserverless/example_outputs/veo31-r2v-output.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/veo3.1/reference-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "image_urls": [
       "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png",
       "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png",
       "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png"
     ],
     "prompt": "A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow."
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
    "fal-ai/veo3.1/reference-to-video",
    arguments={
        "image_urls": ["https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png", "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png", "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png"],
        "prompt": "A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow."
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

const result = await fal.subscribe("fal-ai/veo3.1/reference-to-video", {
  input: {
    image_urls: [
      "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png",
      "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png",
      "https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png",
    ],
    prompt:
      "A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow.",
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

- [Model Playground](https://fal.ai/models/fal-ai/veo3.1/reference-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/veo3.1/reference-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/veo3.1/reference-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)
