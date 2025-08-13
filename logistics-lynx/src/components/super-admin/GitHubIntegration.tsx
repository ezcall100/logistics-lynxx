import React, { useState, useEffect } from 'react';
import { 
  Github, 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  Star, 
  Eye, 
  Download,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  lastCommit: string;
  branch: string;
  contributors: number;
  language: string;
  size: number;
}

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

interface PullRequest {
  id: number;
  title: string;
  author: string;
  status: 'open' | 'merged' | 'closed';
  reviews: number;
  changes: number;
}

const GitHubIntegration = () => {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 1247,
    forks: 89,
    watchers: 234,
    openIssues: 12,
    lastCommit: '2 hours ago',
    branch: 'main',
    contributors: 15,
    language: 'TypeScript',
    size: 45.2
  });

  const [recentCommits, setRecentCommits] = useState<Commit[]>([
    {
      id: 'abc123',
      message: 'feat: Add autonomous AI agent system',
      author: 'TransBot AI',
      date: '2 hours ago',
      status: 'success'
    },
    {
      id: 'def456',
      message: 'fix: Resolve port configuration issues',
      author: 'TransBot AI',
      date: '4 hours ago',
      status: 'success'
    },
    {
      id: 'ghi789',
      message: 'feat: Implement GitHub integration',
      author: 'TransBot AI',
      date: '6 hours ago',
      status: 'success'
    },
    {
      id: 'jkl012',
      message: 'test: Add comprehensive test suite',
      author: 'TransBot AI',
      date: '8 hours ago',
      status: 'pending'
    }
  ]);

  const [pullRequests, setPullRequests] = useState<PullRequest[]>([
    {
      id: 42,
      title: 'Add autonomous deployment pipeline',
      author: 'TransBot AI',
      status: 'open',
      reviews: 2,
      changes: 156
    },
    {
      id: 41,
      title: 'Implement real-time monitoring',
      author: 'TransBot AI',
      status: 'merged',
      reviews: 3,
      changes: 89
    },
    {
      id: 40,
      title: 'Fix authentication flow',
      author: 'TransBot AI',
      status: 'closed',
      reviews: 1,
      changes: 23
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="default" className="bg-green-500">Open</Badge>;
      case 'merged':
        return <Badge variant="secondary" className="bg-purple-500">Merged</Badge>;
      case 'closed':
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800">
            <Github className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">GitHub Integration</h2>
                            <p className="text-sm text-muted-foreground">Repository: TransBot-AI/trans-bot-ai</p>
          </div>
        </div>
        <Button 
          onClick={refreshData} 
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Stars</span>
            </div>
            <p className="text-2xl font-bold">{stats.stars.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Forks</span>
            </div>
            <p className="text-2xl font-bold">{stats.forks}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Watchers</span>
            </div>
            <p className="text-2xl font-bold">{stats.watchers}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Issues</span>
            </div>
            <p className="text-2xl font-bold">{stats.openIssues}</p>
          </CardContent>
        </Card>
      </div>

      {/* Repository Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Commits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="h-5 w-5" />
              Recent Commits
            </CardTitle>
            <CardDescription>Latest autonomous development activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCommits.map((commit) => (
                <div key={commit.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  {getStatusIcon(commit.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{commit.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{commit.author}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{commit.date}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <code className="text-xs bg-muted px-1 rounded">{commit.id.slice(0, 7)}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pull Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5" />
              Pull Requests
            </CardTitle>
            <CardDescription>Active development branches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pullRequests.map((pr) => (
                <div key={pr.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">#{pr.id} {pr.title}</p>
                      {getStatusBadge(pr.status)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{pr.author}</span>
                      <span>•</span>
                      <span>{pr.reviews} reviews</span>
                      <span>•</span>
                      <span>{pr.changes} changes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Repository Details */}
      <Card>
        <CardHeader>
          <CardTitle>Repository Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Branch</p>
              <p className="font-medium flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                {stats.branch}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Language</p>
              <p className="font-medium">{stats.language}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contributors</p>
              <p className="font-medium">{stats.contributors}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Size</p>
              <p className="font-medium">{stats.size} MB</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubIntegration;
