"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { StudioGeneration } from "@/lib/studio/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    CheckCircle2,
    Clock,
    Download,
    ExternalLink,
    Image as ImageIcon,
    Loader2,
    Sparkles,
    Video,
    XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface GenerationHistoryProps {
  generations: StudioGeneration[];
  onRefresh?: () => void;
}

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    animate: false,
  },
  processing: {
    icon: Loader2,
    label: "Processing",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    animate: true,
  },
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    animate: false,
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    animate: false,
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelled",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    animate: false,
  },
};

export function GenerationHistory({
  generations,
  onRefresh,
}: GenerationHistoryProps) {
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh when there are pending/processing generations
  useEffect(() => {
    if (!autoRefresh || !onRefresh) return;

    const hasActiveGenerations = generations.some(
      (g) => g.status === "pending" || g.status === "processing"
    );

    if (!hasActiveGenerations) return;

    const interval = setInterval(() => {
      onRefresh();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, generations, onRefresh]);

  if (generations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Sparkles className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-1">No generations yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Start generating content and your history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          Recent Generations ({generations.length})
        </h3>
        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={autoRefresh}
          >
            {autoRefresh ? "Auto-refresh" : "Refresh"}
          </Button>
        )}
      </div>

      {/* Generation List */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-3 pr-4">
          {generations.map((generation) => {
            const status = STATUS_CONFIG[generation.status];
            const Icon = status.icon;
            const isVideo = generation.generationType.includes("video");
            const MediaIcon = isVideo ? Video : ImageIcon;

            return (
              <Card key={generation.id} className="bg-background border-thin border-border shadow-xs">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {/* Thumbnail/Preview */}
                    <div className="shrink-0">
                      {generation.status === "completed" &&
                      generation.outputAssetId ? (
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center border-thin border-border">
                          {/* TODO: Load actual asset thumbnail */}
                          <MediaIcon className="h-7 w-7 text-muted-foreground/60" />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "w-20 h-20 rounded-lg flex items-center justify-center border-thin border-border",
                            status.bgColor
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-7 w-7",
                              status.color,
                              status.animate && "animate-spin"
                            )}
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            generation.status === "completed"
                              ? "default"
                              : generation.status === "failed"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          <Icon
                            className={cn(
                              "h-3 w-3 mr-1",
                              status.animate && "animate-spin"
                            )}
                          />
                          {status.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(generation.createdAt, "MMM d, HH:mm")}
                        </span>
                      </div>

                      {/* Prompt */}
                      {generation.prompt && (
                        <p className="text-sm line-clamp-2">
                          {generation.prompt}
                        </p>
                      )}

                      {/* Model Info */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {generation.modelId.split("/").pop()}
                        </Badge>
                        <span>•</span>
                        <span className="capitalize">
                          {generation.generationType.replace(/-/g, " ")}
                        </span>
                        {generation.processingTime && (
                          <>
                            <span>•</span>
                            <span>{generation.processingTime}s</span>
                          </>
                        )}
                      </div>

                      {/* Error Message */}
                      {generation.status === "failed" && generation.error && (
                        <p className="text-xs text-destructive">
                          {generation.error}
                        </p>
                      )}

                      {/* Actions */}
                      {generation.status === "completed" &&
                        generation.outputAssetId && (
                          <div className="flex items-center gap-2 pt-1">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
