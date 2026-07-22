import { docsClusters, docsPages } from "../../src/data/docs";
import DocsSidebar from "../../src/components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <DocsSidebar clusters={docsClusters} pages={docsPages} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
