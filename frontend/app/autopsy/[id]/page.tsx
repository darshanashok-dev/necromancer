'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';

export default function AutopsyPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await apiClient.getAutopsy(params.id as string);
        
        if (data.status === 'complete') {
          setReport(data.report);
          setLoading(false);
        } else {
          // Poll every 2 seconds if still analyzing
          setTimeout(fetchReport, 2000);
        }
      } catch (error) {
        console.error('Failed to fetch report:', error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl neon-glow">Performing Autopsy...</CardTitle>
            <CardDescription>
              Analyzing code health, dependencies, and architecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-destructive">Analysis Failed</CardTitle>
            <CardDescription>
              Unable to analyze the repository
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  const healthColor = 
    report.health.score >= 80 ? 'text-green-500' :
    report.health.score >= 60 ? 'text-yellow-500' :
    report.health.score >= 40 ? 'text-orange-500' :
    'text-red-500';

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl neon-glow">Autopsy Report</CardTitle>
            <CardDescription>
              {report.repository.name} - {report.repository.language}
              {report.repository.framework && ` (${report.repository.framework})`}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Health Score */}
        <Card>
          <CardHeader>
            <CardTitle>Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`text-6xl font-bold ${healthColor}`}>
                {report.health.score}
              </div>
              <div>
                <div className="text-2xl font-semibold capitalize">
                  {report.health.status}
                </div>
                <div className="text-muted-foreground">
                  out of 100
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dead Files</CardTitle>
              <CardDescription>{report.findings.deadFiles.length} unused files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {report.findings.deadFiles.slice(0, 10).map((file: string, idx: number) => (
                  <div key={idx} className="text-sm text-muted-foreground font-mono">
                    {file}
                  </div>
                ))}
                {report.findings.deadFiles.length > 10 && (
                  <div className="text-sm text-muted-foreground">
                    ...and {report.findings.deadFiles.length - 10} more
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Issues</CardTitle>
              <CardDescription>{report.findings.securityIssues.length} issues found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {report.findings.securityIssues.slice(0, 5).map((issue: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <span className={`font-semibold ${
                      issue.severity === 'critical' ? 'text-red-500' :
                      issue.severity === 'high' ? 'text-orange-500' :
                      issue.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}>
                      [{issue.severity.toUpperCase()}]
                    </span>
                    <span className="ml-2 text-muted-foreground">{issue.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outdated Dependencies</CardTitle>
              <CardDescription>{report.findings.deprecatedDeps.length} packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {report.findings.deprecatedDeps.slice(0, 10).map((dep: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <div className="font-mono">{dep.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {dep.current} → {dep.latest}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>{report.recommendations.length} suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {report.recommendations.map((rec: string, idx: number) => (
                  <div key={idx} className="text-sm text-muted-foreground">
                    • {rec}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Architecture Diagram */}
        {report.architecture.diagram && (
          <Card>
            <CardHeader>
              <CardTitle>Architecture</CardTitle>
              <CardDescription>
                {report.architecture.type} - {report.architecture.layers.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                {report.architecture.diagram}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
