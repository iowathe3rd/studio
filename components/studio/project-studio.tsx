"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
    StudioAsset,
    StudioGeneration,
    StudioProject,
} from "@/lib/studio/types";
import { FolderOpen, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { AssetGallery } from "./asset-gallery";
import { GenerationHistory } from "./generation-history";
import { GenerationPanel } from "./generation-panel";

interface ProjectStudioProps {
  project: StudioProject;
  initialAssets: StudioAsset[];
  initialGenerations: StudioGeneration[];
}

export function ProjectStudio({
  project,
  initialAssets,
  initialGenerations,
}: ProjectStudioProps) {
  const [assets, setAssets] = useState(initialAssets);
  const [generations, setGenerations] = useState(initialGenerations);
  const [activeTab, setActiveTab] = useState("generate");

  const handleGenerationStart = useCallback((generationId: string) => {
    // Optionally refresh generations
    console.log("Generation started:", generationId);
  }, []);

  const handleGenerationComplete = useCallback(() => {
    // Refresh assets and generations
    console.log("Generation completed");
  }, []);

  const refreshGenerations = useCallback(() => {
    // TODO: Implement refresh
    console.log("Refreshing generations");
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Project Description */}
      {project.description && (
        <div className="px-4 md:px-6 py-3 border-b">
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      )}

      {/* Main Content - Grid Layout */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Panel - Generation Form */}
        <div className="lg:col-span-5 xl:col-span-4 border-r overflow-auto">
          <div className="p-4 md:p-6">
            <GenerationPanel
              projectId={project.id}
              onGenerationStart={handleGenerationStart}
              onGenerationComplete={handleGenerationComplete}
            />
          </div>
        </div>

        {/* Right Panel - Results & History */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <div className="border-b px-4 md:px-6">
              <TabsList className="h-12">
                <TabsTrigger value="generate" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>History</span>
                </TabsTrigger>
                <TabsTrigger value="assets" className="gap-2">
                  <FolderOpen className="h-4 w-4" />
                  <span>Assets</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="generate" className="mt-0 p-4 md:p-6 h-full">
                <GenerationHistory
                  generations={generations}
                  onRefresh={refreshGenerations}
                />
              </TabsContent>

              <TabsContent value="assets" className="mt-0 p-4 md:p-6 h-full">
                <AssetGallery assets={assets} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
