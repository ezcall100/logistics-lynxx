import { LogManager } from '../../autonomous-system/LogManager';

/**
 * 🤖 Autonomous Commit Agent
 * 
 * This agent automatically commits all changes to the repository
 * without any human intervention. It will:
 * 
 * 1. Monitor file changes
 * 2. Stage all modified files
 * 3. Create meaningful commit messages
 * 4. Push changes to remote repository
 * 5. Handle merge conflicts autonomously
 */

export interface CommitInfo {
  hash: string;
  message: string;
  timestamp: Date;
  files: string[];
  author: string;
}

export class AutonomousCommitAgent {
  private logManager: LogManager;
  private isRunning: boolean = false;
  private commitInterval: NodeJS.Timeout | null = null;
  private lastCommitTime: Date | null = null;

  constructor() {
    this.logManager = new LogManager();
  }

  async initialize(): Promise<void> {
    this.logManager.log('🤖 Initializing Autonomous Commit Agent...', 'info');
    
    // Set up git configuration for autonomous operation
    await this.setupGitConfig();
    
    this.logManager.log('✅ Autonomous Commit Agent initialized', 'success');
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      this.logManager.log('⚠️ Commit Agent is already running', 'warning');
      return;
    }

    this.isRunning = true;
    this.logManager.log('🚀 Starting Autonomous Commit Agent...', 'info');
    this.logManager.log('🤖 Will automatically commit all changes without human intervention', 'info');

    // Start monitoring for changes and auto-committing
    this.startAutoCommit();
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    
    if (this.commitInterval) {
      clearInterval(this.commitInterval);
      this.commitInterval = null;
    }
    
    this.logManager.log('🛑 Stopping Autonomous Commit Agent...', 'info');
  }

  private async setupGitConfig(): Promise<void> {
    try {
      // Set up git user for autonomous operation
      await this.executeGitCommand(['config', 'user.name', 'Trans Bot AI Autonomous Agent']);
      await this.executeGitCommand(['config', 'user.email', 'autonomous-agent@transbot.ai']);
      
      this.logManager.log('✅ Git configuration set up for autonomous operation', 'success');
    } catch (error) {
      this.logManager.error(`❌ Failed to setup git config: ${error}`);
    }
  }

  private startAutoCommit(): void {
    // Check for changes every 30 seconds
    this.commitInterval = setInterval(async () => {
      if (this.isRunning) {
        await this.checkAndCommit();
      }
    }, 30000); // 30 seconds

    this.logManager.log('🔄 Auto-commit monitoring started (every 30 seconds)', 'info');
  }

  private async checkAndCommit(): Promise<void> {
    try {
      // Check if there are any changes to commit
      const hasChanges = await this.hasUncommittedChanges();
      
      if (hasChanges) {
        this.logManager.log('📝 Detected uncommitted changes, creating autonomous commit...', 'info');
        await this.createCommit();
      } else {
        this.logManager.debug('No changes detected, skipping commit');
      }
    } catch (error) {
      this.logManager.error(`❌ Error in auto-commit check: ${error}`);
    }
  }

  private async hasUncommittedChanges(): Promise<boolean> {
    try {
      const result = await this.executeGitCommand(['status', '--porcelain']);
      return result.trim().length > 0;
    } catch (error) {
      this.logManager.error(`❌ Error checking for changes: ${error}`);
      return false;
    }
  }

  private async createCommit(): Promise<void> {
    try {
      // Stage all changes
      await this.executeGitCommand(['add', '.']);
      this.logManager.log('📦 Staged all changes', 'info');

      // Generate commit message
      const commitMessage = await this.generateCommitMessage();
      
      // Create commit
      await this.executeGitCommand(['commit', '-m', commitMessage]);
      this.logManager.log(`✅ Created commit: ${commitMessage}`, 'success');

      // Push to remote
      await this.pushToRemote();
      
      this.lastCommitTime = new Date();
      
    } catch (error) {
      this.logManager.error(`❌ Error creating commit: ${error}`);
    }
  }

  private async generateCommitMessage(): Promise<string> {
    try {
      // Get list of changed files
      const changedFiles = await this.executeGitCommand(['diff', '--cached', '--name-only']);
      const files = changedFiles.trim().split('\n').filter(f => f.length > 0);
      
      // Analyze changes to generate meaningful message
      const message = this.analyzeChangesAndGenerateMessage(files);
      
      return message;
    } catch (error) {
      this.logManager.error(`❌ Error generating commit message: ${error}`);
      return 'Autonomous update by Trans Bot AI Agent';
    }
  }

  private analyzeChangesAndGenerateMessage(files: string[]): string {
    const timestamp = new Date().toISOString();
    
    // Categorize changes
    const categories = {
      pages: files.filter(f => f.includes('pages/') || f.includes('components/')),
      styles: files.filter(f => f.includes('.css') || f.includes('.scss')),
      config: files.filter(f => f.includes('config') || f.includes('.json')),
      docs: files.filter(f => f.includes('docs/') || f.includes('.md')),
      scripts: files.filter(f => f.includes('scripts/') || f.includes('.ts')),
      other: files.filter(f => !f.includes('pages/') && !f.includes('components/') && 
                              !f.includes('.css') && !f.includes('.scss') && 
                              !f.includes('config') && !f.includes('.json') &&
                              !f.includes('docs/') && !f.includes('.md') &&
                              !f.includes('scripts/'))
    };

    // Generate descriptive message
    let message = `🤖 Autonomous Update - ${timestamp}\n\n`;
    
    if (categories.pages.length > 0) {
      message += `📄 Pages/Components: ${categories.pages.length} files\n`;
    }
    if (categories.styles.length > 0) {
      message += `🎨 Styles: ${categories.styles.length} files\n`;
    }
    if (categories.config.length > 0) {
      message += `⚙️ Config: ${categories.config.length} files\n`;
    }
    if (categories.docs.length > 0) {
      message += `📚 Docs: ${categories.docs.length} files\n`;
    }
    if (categories.scripts.length > 0) {
      message += `🔧 Scripts: ${categories.scripts.length} files\n`;
    }
    if (categories.other.length > 0) {
      message += `📁 Other: ${categories.other.length} files\n`;
    }

    message += `\nTotal: ${files.length} files updated`;
    message += `\n\n🤖 Trans Bot AI Autonomous Agent - No human intervention required`;

    return message;
  }

  private async pushToRemote(): Promise<void> {
    try {
      await this.executeGitCommand(['push', 'origin', 'main']);
      this.logManager.log('🚀 Pushed changes to remote repository', 'success');
    } catch (error) {
      this.logManager.error(`❌ Error pushing to remote: ${error}`);
      
      // Try to handle merge conflicts autonomously
      await this.handleMergeConflicts();
    }
  }

  private async handleMergeConflicts(): Promise<void> {
    try {
      this.logManager.log('🔄 Attempting to resolve merge conflicts autonomously...', 'info');
      
      // Pull latest changes
      await this.executeGitCommand(['pull', 'origin', 'main', '--rebase']);
      
      // Push again
      await this.executeGitCommand(['push', 'origin', 'main']);
      
      this.logManager.log('✅ Merge conflicts resolved autonomously', 'success');
    } catch (error) {
      this.logManager.error(`❌ Failed to resolve merge conflicts: ${error}`);
    }
  }

  private async executeGitCommand(args: string[]): Promise<string> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    
    const execAsync = promisify(exec);
    
    try {
      const command = `git ${args.join(' ')}`;
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        this.logManager.debug(`Git stderr: ${stderr}`);
      }
      
      return stdout;
    } catch (error) {
      throw new Error(`Git command failed: ${error}`);
    }
  }

  getLastCommitTime(): Date | null {
    return this.lastCommitTime;
  }

  isReady(): boolean {
    return this.isRunning;
  }
}
