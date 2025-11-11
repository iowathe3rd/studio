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

# Kling Video

> Kling 2.5 Turbo Standard: Top-tier image-to-video generation with unparalleled motion fluidity, cinematic visuals, and exceptional prompt precision.

## Overview

- **Endpoint**: `https://fal.run/fal-ai/kling-video/v2.5-turbo/standard/image-to-video`
- **Model ID**: `fal-ai/kling-video/v2.5-turbo/standard/image-to-video`
- **Category**: image-to-video
- **Kind**: inference
  **Tags**: stylized, transform

## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.

### Input Schema

The API accepts the following input parameters:

- **`prompt`** (`string`, _required_)

  - Examples: "In a dimly lit room, a playful cat's eyes light up, fixated on a dancing red dot. With boundless energy, it pounces and leaps, chasing the elusive beam across the floor and up the walls. The simple joy of the hunt unfolds in clear, uncomplicated visuals."

- **`image_url`** (`string`, _required_):
  URL of the image to be used for the video

  - Examples: "https://storage.googleapis.com/falserverless/example_inputs/kling_v25_std_i2v_input.png"

- **`duration`** (`DurationEnum`, _optional_):
  The duration of the generated video in seconds Default value: `"5"`

  - Default: `"5"`
  - Options: `"5"`, `"10"`

- **`negative_prompt`** (`string`, _optional_):
  Default value: `"blur, distort, and low quality"`

  - Default: `"blur, distort, and low quality"`

- **`cfg_scale`** (`float`, _optional_):
  The CFG (Classifier Free Guidance) scale is a measure of how close you want
  the model to stick to your prompt. Default value: `0.5`
  - Default: `0.5`
  - Range: `0` to `1`

**Required Parameters Example**:

```json
{
  "prompt": "In a dimly lit room, a playful cat's eyes light up, fixated on a dancing red dot. With boundless energy, it pounces and leaps, chasing the elusive beam across the floor and up the walls. The simple joy of the hunt unfolds in clear, uncomplicated visuals.",
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/kling_v25_std_i2v_input.png"
}
```

**Full Example**:

```json
{
  "prompt": "In a dimly lit room, a playful cat's eyes light up, fixated on a dancing red dot. With boundless energy, it pounces and leaps, chasing the elusive beam across the floor and up the walls. The simple joy of the hunt unfolds in clear, uncomplicated visuals.",
  "image_url": "https://storage.googleapis.com/falserverless/example_inputs/kling_v25_std_i2v_input.png",
  "duration": "5",
  "negative_prompt": "blur, distort, and low quality",
  "cfg_scale": 0.5
}
```

### Output Schema

The API returns the following output format:

- **`video`** (`File`, _required_):
  The generated video
  - Examples: {"url":"https://storage.googleapis.com/falserverless/example_outputs/kling_v25_std_i2v_output.mp4"}

**Example Response**:

```json
{
  "video": {
    "url": "https://storage.googleapis.com/falserverless/example_outputs/kling_v25_std_i2v_output.mp4"
  }
}
```

## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/kling-video/v2.5-turbo/standard/image-to-video \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "In a dimly lit room, a playful cat's eyes light up, fixated on a dancing red dot. With boundless energy, it pounces and leaps, chasing the elusive beam across the floor and up the walls. The simple joy of the hunt unfolds in clear, uncomplicated visuals.",
     "image_url": "https://storage.googleapis.com/falserverless/example_inputs/kling_v25_std_i2v_input.png"
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
    "fal-ai/kling-video/v2.5-turbo/standard/image-to-video",
    arguments={
        "prompt": "In a dimly lit room, a playful cat's eyes light up, fixated on a dancing red dot. With boundless energy, it pounces and leaps, chasing the elusive beam across the floor and up the walls. The simple joy of the hunt unfolds in clear, uncomplicated visuals.",
        "image_url": "https://storage.googleapis.com/falserverless/example_inputs/kling_v25_std_i2v_input.png"
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
  "fal-ai/kling-video/v2.5-turbo/standard/image-to-video",
  {
    input: {
      prompt:
        "In a dimly lit room, a playful cat's eyes light up, fixated on a dancing red dot. With boundless energy, it pounces and leaps, chasing the elusive beam across the floor and up the walls. The simple joy of the hunt unfolds in clear, uncomplicated visuals.",
      image_url:
        "https://storage.googleapis.com/falserverless/example_inputs/kling_v25_std_i2v_input.png",
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

- [Model Playground](https://fal.ai/models/fal-ai/kling-video/v2.5-turbo/standard/image-to-video)
- [API Documentation](https://fal.ai/models/fal-ai/kling-video/v2.5-turbo/standard/image-to-video/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/v2.5-turbo/standard/image-to-video)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)
