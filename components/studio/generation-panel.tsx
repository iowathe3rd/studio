"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FalStudioModel } from "@/lib/ai/studio-models";
import { generateAction } from "@/lib/studio/actions";
import { getRecommendedModels } from "@/lib/studio/model-mapping";
import type { StudioGenerationType } from "@/lib/studio/types";
import { cn } from "@/lib/utils";
import {
    ChevronRight,
    Image as ImageIcon,
    Loader2,
    Settings2,
    Sparkles,
    Upload,
    Video,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { ModelSelectorDialog } from "./model-selector-dialog";

interface GenerationPanelProps {
  projectId?: string;
  onGenerationStart?: (generationId: string) => void;
  onGenerationComplete?: () => void;
}

const GENERATION_TYPES: Array<{
  value: StudioGenerationType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  {
    value: "text-to-image",
    label: "Text to Image",
    icon: ImageIcon,
    description: "Generate images from text descriptions",
  },
  {
    value: "text-to-video",
    label: "Text to Video",
    icon: Video,
    description: "Create videos from text prompts",
  },
  {
    value: "image-to-video",
    label: "Image to Video",
    icon: Video,
    description: "Animate images into videos",
  },
  {
    value: "image-to-image",
    label: "Image to Image",
    icon: ImageIcon,
    description: "Transform images with AI",
  },
];

export function GenerationPanel({
  projectId,
  onGenerationStart,
  onGenerationComplete,
}: GenerationPanelProps) {
  const [generationType, setGenerationType] =
    useState<StudioGenerationType>("text-to-image");
  const [selectedModel, setSelectedModel] = useState<FalStudioModel | null>(
    () => getRecommendedModels(generationType)[0] || null
  );
  const [modelDialogOpen, setModelDialogOpen] = useState(false);

  // Generation parameters
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [imageSize, setImageSize] = useState("landscape_16_9");
  const [steps, setSteps] = useState([28]);
  const [guidanceScale, setGuidanceScale] = useState([7.5]);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [randomSeed, setRandomSeed] = useState(true);

  // Reference images/videos
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [referenceImagePreview, setReferenceImagePreview] = useState<
    string | null
  >(null);

  const [isGenerating, setIsGenerating] = useState(false);

  // Update model when generation type changes
  const handleGenerationTypeChange = useCallback((type: StudioGenerationType) => {
    setGenerationType(type);
    const recommended = getRecommendedModels(type);
    setSelectedModel(recommended[0] || null);
  }, []);

  // Handle reference image upload
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setReferenceImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setReferenceImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleGenerate = async () => {
    if (!selectedModel) {
      toast.error("Please select a model");
      return;
    }

    if (!prompt.trim() && generationType.startsWith("text-to")) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await generateAction({
        modelId: selectedModel.id,
        projectId,
        generationType,
        prompt: prompt || undefined,
        negativePrompt: negativePrompt || undefined,
        parameters: {
          imageSize,
          numInferenceSteps: steps[0],
          guidanceScale: guidanceScale[0],
          seed: randomSeed ? undefined : seed,
        },
      });

      toast.success("Generation started!");
      onGenerationStart?.(response.generationId);

      // Reset form
      setPrompt("");
      setNegativePrompt("");
      setReferenceImage(null);
      setReferenceImagePreview(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to start generation");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const needsReferenceImage =
    selectedModel?.requiresReferenceImage ||
    generationType.includes("image-to") ||
    generationType === "inpaint";

  return (
    <div className="space-y-6">
      {/* Generation Type Selector */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Generation Type</Label>
        <div className="grid grid-cols-2 gap-3">
          {GENERATION_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = generationType === type.value;

            return (
              <button
                key={type.value}
                onClick={() => handleGenerationTypeChange(type.value)}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border-thin text-left transition-bg-background",
                  isActive
                    ? "border-foreground bg-card"
                    : "border-border bg-background hover:border-foreground/50"
                )}
              >
                <div
                  className={cn(
                    "shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-bg-background",
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-muted/50 text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-0.5">{type.label}</h4>
                  <p className="text-xs text-muted-foreground/80 line-clamp-2">
                    {type.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Selector */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Model</Label>
        <button
          onClick={() => setModelDialogOpen(true)}
          className="w-full flex items-center justify-between p-3 rounded-xl border-thin border-border bg-background hover:border-foreground/50 transition-bg-background text-left shadow-xs"
        >
          {selectedModel ? (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-sm truncate">
                  {selectedModel.name}
                </span>
                {selectedModel.quality && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {selectedModel.quality}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground/80 line-clamp-1">
                {selectedModel.description}
              </p>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground/70">Select model...</span>
          )}
          <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0 ml-2" />
        </button>
      </div>

      {/* Reference Image Upload (if needed) */}
      {needsReferenceImage && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Reference Image</Label>
          {referenceImagePreview ? (
            <div className="relative aspect-video rounded-xl overflow-hidden border-thin border-border bg-background shadow-xs">
              <img
                src={referenceImagePreview}
                alt="Reference"
                className="w-full h-full object-cover"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 shadow-md"
                onClick={() => {
                  setReferenceImage(null);
                  setReferenceImagePreview(null);
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-40 border-thin border-dashed border-border rounded-xl cursor-pointer bg-background hover:border-foreground/50 transition-bg-background">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-7 w-7 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground/80">
                  Click to upload or drag and drop
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      )}

      {/* Prompt */}
      <div className="space-y-3">
        <Label htmlFor="prompt" className="text-sm font-medium">
          Prompt
        </Label>
        <Textarea
          id="prompt"
          placeholder="Describe what you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Advanced Settings */}
      <Card className="bg-background border-thin border-border shadow-xs">
        <CardContent className="pt-5 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Advanced Settings</Label>
            <Settings2 className="h-4 w-4 text-muted-foreground/60" />
          </div>

          {/* Negative Prompt */}
          <div className="space-y-2">
            <Label htmlFor="negative-prompt" className="text-xs">
              Negative Prompt
            </Label>
            <Textarea
              id="negative-prompt"
              placeholder="What to avoid in the generation..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={2}
              className="resize-none text-sm"
            />
          </div>

          {/* Image Size */}
          {generationType.includes("image") && (
            <div className="space-y-2">
              <Label htmlFor="image-size" className="text-xs">
                Image Size
              </Label>
              <Select value={imageSize} onValueChange={setImageSize}>
                <SelectTrigger id="image-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square (1:1)</SelectItem>
                  <SelectItem value="square_hd">Square HD (1:1)</SelectItem>
                  <SelectItem value="portrait_4_3">Portrait (4:3)</SelectItem>
                  <SelectItem value="portrait_16_9">Portrait (16:9)</SelectItem>
                  <SelectItem value="landscape_4_3">Landscape (4:3)</SelectItem>
                  <SelectItem value="landscape_16_9">
                    Landscape (16:9)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Inference Steps */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Inference Steps</Label>
              <span className="text-xs text-muted-foreground">{steps[0]}</span>
            </div>
            <Slider
              value={steps}
              onValueChange={setSteps}
              min={1}
              max={50}
              step={1}
            />
          </div>

          {/* Guidance Scale */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Guidance Scale</Label>
              <span className="text-xs text-muted-foreground">
                {guidanceScale[0]}
              </span>
            </div>
            <Slider
              value={guidanceScale}
              onValueChange={setGuidanceScale}
              min={1}
              max={20}
              step={0.5}
            />
          </div>

          {/* Seed */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="random-seed" className="text-xs">
                Random Seed
              </Label>
              <Switch
                id="random-seed"
                checked={randomSeed}
                onCheckedChange={setRandomSeed}
              />
            </div>
            {!randomSeed && (
              <Input
                type="number"
                placeholder="Enter seed..."
                value={seed || ""}
                onChange={(e) =>
                  setSeed(e.target.value ? Number(e.target.value) : undefined)
                }
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !selectedModel}
        className="w-full h-11 text-sm font-medium rounded-xl shadow-md transition-bg-background"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </>
        )}
      </Button>

      {/* Model Selector Dialog */}
      <ModelSelectorDialog
        open={modelDialogOpen}
        onOpenChange={setModelDialogOpen}
        onSelectModel={setSelectedModel}
        currentModel={selectedModel}
        generationType={generationType}
      />
    </div>
  );
}
