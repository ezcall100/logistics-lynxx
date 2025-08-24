#!/usr/bin/env ts-node

// 🚀 MCP Page Generation Execution Script
// Run this to generate all Super Admin pages autonomously

import { MCPGenerator } from './MCPGenerator';
import { mcpMenuStructure } from './mcp.config';

export const generatePages = async () => {
  const generator = new MCPGenerator();
  
  for (const pageConfig of mcpMenuStructure) {
    await generator.generatePage(pageConfig);
  }
};
