import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 crt-scanlines">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold neon-glow mb-4">
          🧟 NECROSTACK
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
          Dead Code Resurrection & Soul Transfer Engine
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Bring abandoned repositories back to life. Analyze, revive, extract,
          and regenerate your code into modern tech stacks.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/upload"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
          >
            Start Resurrection
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-lg font-semibold"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
