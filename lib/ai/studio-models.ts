export type ReferenceInputKind =
  | "reference-image"
  | "first-frame"
  | "last-frame"
  | "reference-video";

export type ModelSettingOption = {
  label: string;
  value: string | number | boolean;
};

export type SelectModelSetting = {
  type: "select";
  key: string;
  label: string;
  defaultValue: string | number;
  options: ModelSettingOption[];
  helperText?: string;
  required?: boolean;
};

export type ToggleModelSetting = {
  type: "toggle";
  key: string;
  label: string;
  defaultValue: boolean;
  helperText?: string;
  required?: boolean;
};

export type TextModelSetting = {
  type: "text" | "textarea";
  key: string;
  label: string;
  helperText?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

export type ModelSetting =
  | SelectModelSetting
  | ToggleModelSetting
  | TextModelSetting;

export type FalStudioModel = {
  id: string;
  name: string;
  description: string;
  type: "image" | "video";
  provider: "fal";
  creator: string;
  quality?: string;
  supportsImageInput?: boolean;
  supportsVideoInput?: boolean;
  requiresReferenceImage?: boolean;
  requiredInputs: ReferenceInputKind[];
  optionalInputs: ReferenceInputKind[];
  requiresPrompt?: boolean;
  settings?: ModelSetting[];
};

const SORA_DURATION_OPTIONS: ModelSettingOption[] = [4, 8, 12].map(
  (value) => ({
    label: `${value} seconds`,
    value,
  })
);

const SORA_ASPECT_OPTIONS: ModelSettingOption[] = [
  { label: "Auto", value: "auto" },
  { label: "16:9", value: "16:9" },
  { label: "9:16", value: "9:16" },
];

const VEO_DURATION_OPTIONS: ModelSettingOption[] = [
  { label: "4 seconds", value: "4s" },
  { label: "6 seconds", value: "6s" },
  { label: "8 seconds", value: "8s" },
];

const VEO_ASPECT_OPTIONS: ModelSettingOption[] = [
  { label: "16:9 (Landscape)", value: "16:9" },
  { label: "9:16 (Portrait)", value: "9:16" },
  { label: "1:1 (Square)", value: "1:1" },
];

const SORA_MODELS: FalStudioModel[] = [
  {
    id: "fal-ai/sora-2/text-to-video",
    name: "Sora 2 Text-to-Video",
    description:
      "OpenAI's cinematic text-to-video model with natural audio and coherent motion.",
    type: "video",
    provider: "fal",
    creator: "OpenAI",
    quality: "Studio",
    supportsImageInput: false,
    supportsVideoInput: false,
    requiresReferenceImage: false,
    requiredInputs: [],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "16:9",
        options: SORA_ASPECT_OPTIONS.filter((option) => option.value !== "auto"),
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: 4,
        options: SORA_DURATION_OPTIONS,
      },
    ],
  },
  {
    id: "fal-ai/sora-2/text-to-video/pro",
    name: "Sora 2 Pro Text-to-Video",
    description:
      "Higher fidelity text-to-video generation with 1080p support and richer detail.",
    type: "video",
    provider: "fal",
    creator: "OpenAI",
    quality: "Pro",
    supportsImageInput: false,
    supportsVideoInput: false,
    requiresReferenceImage: false,
    requiredInputs: [],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "1080p",
        options: [
          { label: "1080p", value: "1080p" },
          { label: "720p", value: "720p" },
        ],
      },
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "16:9",
        options: SORA_ASPECT_OPTIONS.filter((option) => option.value !== "auto"),
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: 4,
        options: SORA_DURATION_OPTIONS,
      },
    ],
  },
  {
    id: "fal-ai/sora-2/image-to-video",
    name: "Sora 2 Image-to-Video",
    description:
      "Animate a single reference frame with OpenAI Sora while preserving camera and composition.",
    type: "video",
    provider: "fal",
    creator: "OpenAI",
    quality: "Studio",
    supportsImageInput: true,
    supportsVideoInput: false,
    requiresReferenceImage: true,
    requiredInputs: ["reference-image"],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "auto",
        options: [
          { label: "Auto", value: "auto" },
          { label: "720p", value: "720p" },
        ],
      },
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "auto",
        options: SORA_ASPECT_OPTIONS,
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: 4,
        options: SORA_DURATION_OPTIONS,
      },
    ],
  },
  {
    id: "fal-ai/sora-2/image-to-video/pro",
    name: "Sora 2 Pro Image-to-Video",
    description:
      "Premium image-to-video mode with 1080p output and more dynamic motion control.",
    type: "video",
    provider: "fal",
    creator: "OpenAI",
    quality: "Pro",
    supportsImageInput: true,
    supportsVideoInput: false,
    requiresReferenceImage: true,
    requiredInputs: ["reference-image"],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "auto",
        options: [
          { label: "Auto", value: "auto" },
          { label: "1080p", value: "1080p" },
          { label: "720p", value: "720p" },
        ],
      },
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "auto",
        options: SORA_ASPECT_OPTIONS,
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: 4,
        options: SORA_DURATION_OPTIONS,
      },
    ],
  },
  {
    id: "fal-ai/sora-2/video-to-video/remix",
    name: "Sora 2 Video Remix",
    description:
      "Remix previously generated Sora clips using updated prompts without re-uploading footage.",
    type: "video",
    provider: "fal",
    creator: "OpenAI",
    quality: "Studio",
    supportsImageInput: false,
    supportsVideoInput: false,
    requiresReferenceImage: false,
    requiredInputs: [],
    optionalInputs: [],
    settings: [
      {
        type: "text",
        key: "video_id",
        label: "Source Video ID",
        helperText: "Use the video_id returned by an earlier Sora generation.",
        placeholder: "video_123",
        required: true,
        defaultValue: "",
      },
    ],
  },
];

const VEO_MODELS: FalStudioModel[] = [
  {
    id: "fal-ai/veo3.1",
    name: "Veo 3.1 Text-to-Video",
    description:
      "Google DeepMind's flagship Veo 3.1 model with audio, prompt enhancement, and policy auto-fix.",
    type: "video",
    provider: "fal",
    creator: "Google DeepMind",
    quality: "SOTA",
    supportsImageInput: false,
    supportsVideoInput: false,
    requiresReferenceImage: false,
    requiredInputs: [],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "16:9",
        options: VEO_ASPECT_OPTIONS,
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: "8s",
        options: VEO_DURATION_OPTIONS,
      },
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "720p",
        options: [
          { label: "720p", value: "720p" },
          { label: "1080p", value: "1080p" },
        ],
      },
      {
        type: "toggle",
        key: "generate_audio",
        label: "Generate Audio",
        defaultValue: true,
        helperText: "Disable to save credits when silent footage is enough.",
      },
      {
        type: "toggle",
        key: "enhance_prompt",
        label: "Enhance Prompt",
        defaultValue: true,
      },
      {
        type: "toggle",
        key: "auto_fix",
        label: "Auto Fix",
        defaultValue: true,
        helperText: "Automatically rewrite prompts that trip policy filters.",
      },
      {
        type: "textarea",
        key: "negative_prompt",
        label: "Negative Prompt",
        helperText: "Describe elements to avoid in the clip.",
        defaultValue: "",
      },
    ],
  },
  {
    id: "fal-ai/veo3.1/fast",
    name: "Veo 3.1 Fast Text-to-Video",
    description:
      "Faster, more affordable Veo 3.1 generation for quick text-to-video iterations.",
    type: "video",
    provider: "fal",
    creator: "Google DeepMind",
    quality: "Pro",
    supportsImageInput: false,
    supportsVideoInput: false,
    requiresReferenceImage: false,
    requiredInputs: [],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "16:9",
        options: VEO_ASPECT_OPTIONS,
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: "8s",
        options: VEO_DURATION_OPTIONS,
      },
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "720p",
        options: [
          { label: "720p", value: "720p" },
          { label: "1080p", value: "1080p" },
        ],
      },
      {
        type: "toggle",
        key: "generate_audio",
        label: "Generate Audio",
        defaultValue: true,
      },
      {
        type: "toggle",
        key: "enhance_prompt",
        label: "Enhance Prompt",
        defaultValue: true,
      },
      {
        type: "toggle",
        key: "auto_fix",
        label: "Auto Fix",
        defaultValue: true,
      },
      {
        type: "textarea",
        key: "negative_prompt",
        label: "Negative Prompt",
        defaultValue: "",
      },
    ],
  },
  {
    id: "fal-ai/veo3.1/image-to-video",
    name: "Veo 3.1 Image-to-Video",
    description:
      "Animate still frames with Veo 3.1 while preserving subject fidelity and cinematic motion.",
    type: "video",
    provider: "fal",
    creator: "Google DeepMind",
    quality: "SOTA",
    supportsImageInput: true,
    supportsVideoInput: false,
    requiresReferenceImage: true,
    requiredInputs: ["reference-image"],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "16:9",
        options: VEO_ASPECT_OPTIONS,
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: "8s",
        options: VEO_DURATION_OPTIONS,
      },
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "720p",
        options: [
          { label: "720p", value: "720p" },
          { label: "1080p", value: "1080p" },
        ],
      },
      {
        type: "toggle",
        key: "generate_audio",
        label: "Generate Audio",
        defaultValue: true,
      },
    ],
  },
  {
    id: "fal-ai/veo3.1/fast/image-to-video",
    name: "Veo 3.1 Fast Image-to-Video",
    description:
      "Speed-optimized Veo 3.1 image-to-video with the same subject consistency at lower latency.",
    type: "video",
    provider: "fal",
    creator: "Google DeepMind",
    quality: "Pro",
    supportsImageInput: true,
    supportsVideoInput: false,
    requiresReferenceImage: true,
    requiredInputs: ["reference-image"],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "auto",
        options: [
          { label: "Auto", value: "auto" },
          ...VEO_ASPECT_OPTIONS,
        ],
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: "8s",
        options: VEO_DURATION_OPTIONS,
      },
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "720p",
        options: [
          { label: "720p", value: "720p" },
          { label: "1080p", value: "1080p" },
        ],
      },
      {
        type: "toggle",
        key: "generate_audio",
        label: "Generate Audio",
        defaultValue: true,
      },
    ],
  },
  {
    id: "fal-ai/veo3.1/first-last-frame-to-video",
    name: "Veo 3.1 First/Last Frame",
    description:
      "Blend two keyframes into a seamless Veo 3.1 shot with policy-aware prompt controls.",
    type: "video",
    provider: "fal",
    creator: "Google DeepMind",
    quality: "SOTA",
    supportsImageInput: true,
    supportsVideoInput: false,
    requiresReferenceImage: true,
    requiredInputs: ["first-frame", "last-frame"],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "auto",
        options: [
          { label: "Auto", value: "auto" },
          ...VEO_ASPECT_OPTIONS,
        ],
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: "8s",
        options: VEO_DURATION_OPTIONS,
      },
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "720p",
        options: [
          { label: "720p", value: "720p" },
          { label: "1080p", value: "1080p" },
        ],
      },
      {
        type: "toggle",
        key: "generate_audio",
        label: "Generate Audio",
        defaultValue: true,
      },
    ],
  },
  {
    id: "fal-ai/veo3.1/fast/first-last-frame-to-video",
    name: "Veo 3.1 Fast First/Last",
    description:
      "Rapid first/last frame blending for Veo 3.1 with streamlined credit usage.",
    type: "video",
    provider: "fal",
    creator: "Google DeepMind",
    quality: "Pro",
    supportsImageInput: true,
    supportsVideoInput: false,
    requiresReferenceImage: true,
    requiredInputs: ["first-frame", "last-frame"],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "aspect_ratio",
        label: "Aspect Ratio",
        defaultValue: "auto",
        options: [
          { label: "Auto", value: "auto" },
          ...VEO_ASPECT_OPTIONS,
        ],
      },
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: "8s",
        options: VEO_DURATION_OPTIONS,
      },
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "720p",
        options: [
          { label: "720p", value: "720p" },
          { label: "1080p", value: "1080p" },
        ],
      },
      {
        type: "toggle",
        key: "generate_audio",
        label: "Generate Audio",
        defaultValue: true,
      },
    ],
  },
  {
    id: "fal-ai/veo3.1/reference-to-video",
    name: "Veo 3.1 Reference-to-Video",
    description:
      "Feed multiple hero stills into Veo 3.1 for consistent subject reenactment and camera work.",
    type: "video",
    provider: "fal",
    creator: "Google DeepMind",
    quality: "SOTA",
    supportsImageInput: true,
    supportsVideoInput: false,
    requiresReferenceImage: true,
    requiredInputs: ["reference-image"],
    optionalInputs: [],
    settings: [
      {
        type: "select",
        key: "duration",
        label: "Duration",
        defaultValue: "8s",
        options: VEO_DURATION_OPTIONS.filter((option) => option.value === "8s"),
      },
      {
        type: "select",
        key: "resolution",
        label: "Resolution",
        defaultValue: "720p",
        options: [
          { label: "720p", value: "720p" },
          { label: "1080p", value: "1080p" },
        ],
      },
      {
        type: "toggle",
        key: "generate_audio",
        label: "Generate Audio",
        defaultValue: true,
      },
    ],
  },
];

export const FAL_MODEL_GROUPS: Array<{
  creator: string;
  models: FalStudioModel[];
}> = [
  {
    creator: "OpenAI",
    models: SORA_MODELS,
  },
  {
    creator: "Google DeepMind",
    models: VEO_MODELS,
  },
];

export const ALL_FAL_MODELS: FalStudioModel[] = FAL_MODEL_GROUPS.flatMap(
  (group) => group.models
);
