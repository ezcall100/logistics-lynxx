import fs from "node:fs";
import path from "node:path";

const LOCK = ".runtime/autonomous.lock";

export function acquire(): void {
  try {
    // Ensure runtime directory exists
    fs.mkdirSync(".runtime", { recursive: true });
    
    // Check if lock already exists
    if (fs.existsSync(LOCK)) {
      const pid = fs.readFileSync(LOCK, 'utf8').trim();
      throw new Error(`Another autonomous instance is running (PID: ${pid}).`);
    }
    
    // Create lock file with current PID
    fs.writeFileSync(LOCK, String(process.pid));
    
    // Clean up lock file on exit
    process.on("exit", () => { 
      try { 
        fs.unlinkSync(LOCK); 
      } catch (error) {
        // Ignore errors during cleanup
      } 
    });
    
    // Clean up on SIGINT/SIGTERM
    process.on("SIGINT", () => {
      try { 
        fs.unlinkSync(LOCK); 
      } catch (error) {
        // Ignore errors during cleanup
      } 
      process.exit(0);
    });
    
    process.on("SIGTERM", () => {
      try { 
        fs.unlinkSync(LOCK); 
      } catch (error) {
        // Ignore errors during cleanup
      } 
      process.exit(0);
    });
    
  } catch (error) {
    console.error("❌ Failed to acquire lock:", error);
    throw error;
  }
}

export function release(): void {
  try {
    if (fs.existsSync(LOCK)) {
      fs.unlinkSync(LOCK);
    }
  } catch (error) {
    console.warn("⚠️ Failed to release lock:", error);
  }
}

export function isLocked(): boolean {
  return fs.existsSync(LOCK);
}

export function getLockPid(): string | null {
  try {
    if (fs.existsSync(LOCK)) {
      return fs.readFileSync(LOCK, 'utf8').trim();
    }
    return null;
  } catch {
    return null;
  }
}
