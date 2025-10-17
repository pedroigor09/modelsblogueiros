import CreativeShowcase from '@/components/showcase';
import { VibesSection } from '@/components/VibesSection';
import { mockBloggers } from '@/data/bloggers';

export default function Home() {
  return (
    <main>
      <CreativeShowcase />
      <VibesSection bloggers={mockBloggers} />
    </main>
  );
}
