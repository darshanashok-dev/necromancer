'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UploadPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement actual API call
    setTimeout(() => {
      router.push('/autopsy/demo-id');
    }, 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl neon-glow">Upload Repository</CardTitle>
          <CardDescription>
            Enter a GitHub URL or upload a repository ZIP file to begin the resurrection process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="repoUrl" className="block text-sm font-medium mb-2">
                GitHub Repository URL
              </label>
              <input
                id="repoUrl"
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            
            <div className="text-center text-muted-foreground">or</div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload ZIP File
              </label>
              <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".zip"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <p className="text-muted-foreground">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Maximum file size: 100MB
                  </p>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Starting Analysis...' : 'Begin Autopsy'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
