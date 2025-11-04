import { GenerationHistory } from "@/components/studio/generation-history";
import { StudioHeader } from "@/components/studio/studio-header";
import { getUserGenerationsAction } from "@/lib/studio/actions";

export default async function GenerationsPage() {
  const generations = await getUserGenerationsAction();

  return (
    <div className="flex flex-col h-full">
      <StudioHeader title="Generations" showNewButton={false} />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <GenerationHistory generations={generations} />
        </div>
      </main>
    </div>
  );
}
