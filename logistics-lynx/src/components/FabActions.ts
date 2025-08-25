import { MCP, MCPUtils } from '@/services/mcp';
import { toast } from 'sonner';

// FAB Action Types
export interface FabActionPayload {
  type: string;
  payload: Record<string, any>;
  priority?: number;
  agent_id?: string;
}

// FAB Action Results
export interface FabActionResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// Dispatch Task Action
export async function runDispatch(payload: FabActionPayload): Promise<FabActionResult> {
  try {
    toast.info('🚀 Dispatching task...');
    
    const task = await MCP.tasks.create({
      type: payload.type,
      payload: payload.payload,
      priority: payload.priority || 1,
      agent_id: payload.agent_id,
    });
    
    toast.success(`✅ Task #${task.id} queued successfully`);
    
    // Poll for completion if it's a quick task
    if (['scan_document', 'quick_analysis', 'status_check'].includes(payload.type)) {
      setTimeout(async () => {
        try {
          const completedTask = await MCPUtils.pollTask(task.id, 30, 2000);
          if (completedTask.status === 'completed') {
            toast.success(`✅ Task #${task.id} completed successfully`);
          } else if (completedTask.status === 'failed') {
            toast.error(`❌ Task #${task.id} failed: ${completedTask.error}`);
          }
        } catch (error) {
          console.warn('Task polling failed:', error);
        }
      }, 1000);
    }
    
    return {
      success: true,
      message: `Task #${task.id} queued successfully`,
      data: task,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Dispatch failed';
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// Document Scan Action
export async function scanDocument(file: File, metadata?: Record<string, any>): Promise<FabActionResult> {
  try {
    toast.info('📄 Scanning document...');
    
    const uploadResult = await MCP.docs.upload(file, metadata);
    
    if (uploadResult.status === 'processing') {
      toast.success('📄 Document uploaded, processing...');
      
      // Poll for processing completion
      setTimeout(async () => {
        try {
          const doc = await MCP.docs.get(uploadResult.id);
          if (doc.status === 'completed') {
            toast.success('✅ Document processed successfully');
          } else if (doc.status === 'failed') {
            toast.error('❌ Document processing failed');
          }
        } catch (error) {
          console.warn('Document status check failed:', error);
        }
      }, 2000);
    }
    
    return {
      success: true,
      message: 'Document uploaded successfully',
      data: uploadResult,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Document scan failed';
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// AI Assistant Action
export async function invokeAssistant(
  message: string, 
  context?: Record<string, any>
): Promise<FabActionResult> {
  try {
    toast.info('🤖 AI Assistant processing...');
    
    const response = await MCP.assistant.invoke({
      message,
      context,
      tools: ['dispatch_task', 'scan_document', 'get_status', 'navigate'],
    });
    
    toast.success('✅ AI Assistant responded');
    
    return {
      success: true,
      message: response.message,
      data: response,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'AI Assistant failed';
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// Phone Call Action
export async function initiatePhoneCall(phoneNumber: string): Promise<FabActionResult> {
  try {
    toast.info('📞 Initiating call...');
    
    const task = await MCP.tasks.create({
      type: 'phone_call',
      payload: {
        phone_number: phoneNumber,
        action: 'initiate',
      },
      priority: 2,
    });
    
    toast.success(`📞 Call task #${task.id} queued`);
    
    return {
      success: true,
      message: `Call to ${phoneNumber} initiated`,
      data: task,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Phone call failed';
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// Message Action
export async function sendMessage(
  recipient: string, 
  message: string, 
  channel: 'sms' | 'email' | 'chat' = 'sms'
): Promise<FabActionResult> {
  try {
    toast.info('💬 Sending message...');
    
    const task = await MCP.tasks.create({
      type: 'send_message',
      payload: {
        recipient,
        message,
        channel,
      },
      priority: 1,
    });
    
    toast.success(`💬 Message task #${task.id} queued`);
    
    return {
      success: true,
      message: `Message sent to ${recipient}`,
      data: task,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Message sending failed';
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// Emergency Support Action
export async function requestEmergencySupport(
  issue: string, 
  priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
): Promise<FabActionResult> {
  try {
    toast.info('🚨 Requesting emergency support...');
    
    const task = await MCP.tasks.create({
      type: 'emergency_support',
      payload: {
        issue,
        priority,
        timestamp: new Date().toISOString(),
      },
      priority: priority === 'critical' ? 5 : priority === 'high' ? 4 : 3,
    });
    
    toast.success(`🚨 Emergency support task #${task.id} created`);
    
    return {
      success: true,
      message: 'Emergency support requested',
      data: task,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Emergency support request failed';
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// Quick Actions
export async function performQuickAction(action: string, params?: Record<string, any>): Promise<FabActionResult> {
  try {
    toast.info(`⚡ Performing ${action}...`);
    
    const task = await MCP.tasks.create({
      type: `quick_${action}`,
      payload: params || {},
      priority: 1,
    });
    
    toast.success(`⚡ ${action} task #${task.id} queued`);
    
    return {
      success: true,
      message: `${action} initiated successfully`,
      data: task,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || `${action} failed`;
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// System Operations
export async function performSystemOperation(operation: string): Promise<FabActionResult> {
  try {
    toast.info(`🔧 Performing ${operation}...`);
    
    let result;
    switch (operation) {
      case 'restart':
        result = await MCP.system.restart();
        break;
      case 'drain':
        result = await MCP.system.drain();
        break;
      case 'reindex':
        result = await MCP.system.reindex();
        break;
      case 'refresh_caches':
        result = await MCP.system.refreshCaches();
        break;
      default:
        throw new Error(`Unknown system operation: ${operation}`);
    }
    
    if (result.success) {
      toast.success(`✅ ${operation} completed successfully`);
    } else {
      toast.error(`❌ ${operation} failed: ${result.message}`);
    }
    
    return {
      success: result.success,
      message: result.message,
      data: result,
    };
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || `${operation} failed`;
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

// FAB Action Registry
export const FabActions = {
  dispatch: runDispatch,
  scanDocument,
  assistant: invokeAssistant,
  phoneCall: initiatePhoneCall,
  message: sendMessage,
  emergencySupport: requestEmergencySupport,
  quickAction: performQuickAction,
  systemOperation: performSystemOperation,
};

// FAB Action Types for TypeScript
export type FabActionType = keyof typeof FabActions;

// Utility function to execute any FAB action
export async function executeFabAction(
  action: FabActionType,
  ...args: any[]
): Promise<FabActionResult> {
  const actionFn = FabActions[action];
  if (!actionFn) {
    const errorMessage = `Unknown FAB action: ${action}`;
    toast.error(`❌ ${errorMessage}`);
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
  
  try {
    return await actionFn(...args);
  } catch (error: any) {
    const errorMessage = error?.message || `${action} failed`;
    toast.error(`❌ ${errorMessage}`);
    
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

export default FabActions;
