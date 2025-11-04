import { AssetGallery } from "@/components/studio/asset-gallery";
import { StudioHeader } from "@/components/studio/studio-header";
import { getUserAssetsAction } from "@/lib/studio/actions";

export default async function AssetsPage() {
  const assets = await getUserAssetsAction();

  return (
    <div className="flex flex-col h-full">
      <StudioHeader title="Assets" showNewButton={false} />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <AssetGallery assets={assets} />
        </div>
      </main>
    </div>
  );
}
