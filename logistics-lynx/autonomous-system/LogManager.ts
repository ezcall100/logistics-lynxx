/**
 * 📝 Log Manager for Autonomous TMS System
 * Handles logging, monitoring, and debugging for all autonomous agents
 */

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'success' | 'warning' | 'error' | 'debug';
  message: string;
  agentId?: string;
  component?: string;
  metadata?: unknown;
}

export class LogManager {
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;
  private isDebugMode: boolean = process.env['NODE_ENV'] === 'development';

  constructor() {
    this.log('📝 Log Manager initialized', 'info');
  }

  /**
   * Log a message with specified level
   */
  log(message: string, level: LogEntry['level'] = 'info', metadata?: unknown): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      metadata
    };

    this.logs.push(entry);

    // Keep logs under max limit
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output with colors
    this.outputToConsole(entry);
  }

  /**
   * Log info message
   */
  info(message: string, metadata?: unknown): void {
    this.log(message, 'info', metadata);
  }

  /**
   * Log success message
   */
  success(message: string, metadata?: unknown): void {
    this.log(message, 'success', metadata);
  }

  /**
   * Log warning message
   */
  warning(message: string, metadata?: unknown): void {
    this.log(message, 'warning', metadata);
  }

  /**
   * Log error message
   */
  error(message: string, metadata?: unknown): void {
    this.log(message, 'error', metadata);
  }

  /**
   * Log debug message (only in debug mode)
   */
  debug(message: string, metadata?: unknown): void {
    if (this.isDebugMode) {
      this.log(message, 'debug', metadata);
    }
  }

  /**
   * Get all logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: LogEntry['level']): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Get recent logs (last N entries)
   */
  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logs.slice(-count);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
    this.log('📝 Logs cleared', 'info');
  }

  /**
   * Output log entry to console with colors
   */
  private outputToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString();
    const levelColors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      debug: '\x1b[35m'    // Magenta
    };

    const resetColor = '\x1b[0m';
    const color = levelColors[entry.level];
    const levelUpper = entry.level.toUpperCase().padEnd(7);

    console.log(`${color}[${timestamp}] ${levelUpper}${resetColor} ${entry.message}`);
    
    if (entry.metadata && this.isDebugMode) {
      console.log(`${color}  └─ Metadata:${resetColor}`, entry.metadata);
    }
  }

  /**
   * Export logs to file
   */
  async exportLogs(filename: string = `logs-${Date.now()}.json`): Promise<void> {
    try {
      const fs = await import('fs/promises');
      await fs.writeFile(filename, JSON.stringify(this.logs, null, 2));
      this.log(`📁 Logs exported to ${filename}`, 'success');
    } catch (error) {
      this.error(`Failed to export logs: ${error}`);
    }
  }
}
