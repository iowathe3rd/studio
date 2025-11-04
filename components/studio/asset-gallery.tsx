"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { StudioAsset, StudioAssetType } from "@/lib/studio/types";
import { format } from "date-fns";
import {
    Download,
    ExternalLink,
    Grid3x3,
    Image as ImageIcon,
    List,
    Search,
    Upload,
    Video,
} from "lucide-react";
import { useState } from "react";

interface AssetGalleryProps {
  assets: StudioAsset[];
  onAssetClick?: (asset: StudioAsset) => void;
  onUpload?: () => void;
}

type ViewMode = "grid" | "list";

export function AssetGallery({
  assets,
  onAssetClick,
  onUpload,
}: AssetGalleryProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<StudioAssetType | "all">("all");

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      !search ||
      asset.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
        <Upload className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-semibold mb-1">No assets yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          Generate content or upload files to see them here
        </p>
        {onUpload && (
          <Button onClick={onUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Asset
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Type Filter */}
        <Select
          value={typeFilter}
          onValueChange={(value) =>
            setTypeFilter(value as StudioAssetType | "all")
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode Toggle */}
        <div className="flex items-center border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Upload Button */}
        {onUpload && (
          <Button onClick={onUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        )}
      </div>

      {/* Asset Count */}
      <div className="text-sm text-muted-foreground">
        {filteredAssets.length} {filteredAssets.length === 1 ? "asset" : "assets"}
      </div>

      {/* Assets */}
      {filteredAssets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">
            No assets found matching your filters
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onClick={() => onAssetClick?.(asset)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAssets.map((asset) => (
            <AssetListItem
              key={asset.id}
              asset={asset}
              onClick={() => onAssetClick?.(asset)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AssetCard({
  asset,
  onClick,
}: {
  asset: StudioAsset;
  onClick?: () => void;
}) {
  const isVideo = asset.type === "video";
  const Icon = isVideo ? Video : ImageIcon;

  return (
    <Card className="group cursor-pointer bg-background border-thin border-border hover:border-foreground/50 transition-bg-background shadow-xs">
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div
          className="relative aspect-video bg-muted/30 flex items-center justify-center overflow-hidden"
          onClick={onClick}
        >
          {asset.thumbnailUrl ? (
            <img
              src={asset.thumbnailUrl}
              alt={asset.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon className="h-7 w-7 text-muted-foreground/60" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary" className="shadow-md">
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="secondary" className="shadow-md">
              <Download className="h-3 w-3" />
            </Button>
          </div>

          {/* Type Badge */}
          <Badge
            className="absolute top-2 right-2 bg-card border-thin border-border text-xs px-1.5 py-0"
            variant={isVideo ? "default" : "secondary"}
          >
            {asset.type}
          </Badge>
        </div>

        {/* Info */}
        <div className="p-3 space-y-0.5">
          <h4 className="font-medium text-sm truncate">{asset.name}</h4>
          <div className="flex items-center justify-between text-xs text-muted-foreground/70">
            <span>{format(asset.createdAt, "MMM d, yyyy")}</span>
            {asset.metadata.size && (
              <span>{formatBytes(asset.metadata.size)}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AssetListItem({
  asset,
  onClick,
}: {
  asset: StudioAsset;
  onClick?: () => void;
}) {
  const isVideo = asset.type === "video";
  const Icon = isVideo ? Video : ImageIcon;

  return (
    <Card className="group cursor-pointer hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div
            className="shrink-0 w-20 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden"
            onClick={onClick}
          >
            {asset.thumbnailUrl ? (
              <img
                src={asset.thumbnailUrl}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon className="h-6 w-6 text-muted-foreground" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate mb-1">{asset.name}</h4>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant={isVideo ? "default" : "secondary"}>
                {asset.type}
              </Badge>
              <span>{format(asset.createdAt, "MMM d, yyyy")}</span>
              {asset.metadata.width && asset.metadata.height && (
                <span>
                  {asset.metadata.width}×{asset.metadata.height}
                </span>
              )}
              {asset.metadata.size && (
                <span>{formatBytes(asset.metadata.size)}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <ExternalLink className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}
