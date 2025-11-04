"use client";

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type FalStudioModel } from "@/lib/ai/studio-models";
import { getModelsByGenerationType } from "@/lib/studio/model-mapping";
import type { StudioGenerationType } from "@/lib/studio/types";
import { cn } from "@/lib/utils";
import { Check, Image, Search, Sparkles, Video } from "lucide-react";
import { useState } from "react";

const GENERATION_TYPE_LABELS: Record<StudioGenerationType, string> = {
  "text-to-image": "Text to Image",
  "text-to-video": "Text to Video",
  "image-to-image": "Image to Image",
  "image-to-video": "Image to Video",
  "video-to-video": "Video to Video",
  inpaint: "Inpainting",
  lipsync: "Lip Sync",
};

interface ModelSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectModel: (model: FalStudioModel) => void;
  currentModel: FalStudioModel | null;
  generationType: StudioGenerationType;
}

export function ModelSelectorDialog({
  open,
  onOpenChange,
  onSelectModel,
  currentModel,
  generationType,
}: ModelSelectorDialogProps) {
  const [search, setSearch] = useState("");
  const models = getModelsByGenerationType(generationType);

  const filteredModels = models.filter((model) => {
    const searchLower = search.toLowerCase();
    return (
      model.name.toLowerCase().includes(searchLower) ||
      model.description.toLowerCase().includes(searchLower) ||
      model.creator.toLowerCase().includes(searchLower)
    );
  });

  const handleSelect = (model: FalStudioModel) => {
    onSelectModel(model);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-card border-thin border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">Select Model</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground/80">
            Choose a model for {GENERATION_TYPE_LABELS[generationType]}
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input
            type="search"
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background border-thin border-border rounded-xl"
          />
        </div>

        {/* Models Grid */}
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid gap-3">
            {filteredModels.map((model) => {
              const isSelected = currentModel?.id === model.id;

              return (
                <button
                  key={model.id}
                  onClick={() => handleSelect(model)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border-thin transition-bg-background text-left",
                    isSelected
                      ? "border-foreground bg-card"
                      : "border-border bg-background hover:border-foreground/50"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-bg-background",
                      model.type === "video"
                        ? "bg-foreground/5 text-foreground/70"
                        : "bg-foreground/5 text-foreground/70"
                    )}
                  >
                    {model.type === "video" ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <Image className="h-4 w-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm truncate">
                            {model.name}
                          </h4>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {model.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {model.creator}
                          </Badge>
                          {model.quality && (
                            <Badge variant="secondary" className="text-xs">
                              {model.quality}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredModels.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                No models found matching "{search}"
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
