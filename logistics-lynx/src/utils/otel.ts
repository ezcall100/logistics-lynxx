import { trace } from '@opentelemetry/api';

export const createPortalSpan = (portalName: string, operation: string) => {
  const tracer = trace.getTracer('portal-operations');
  return tracer.startSpan(`agent.task.execute`, {
    attributes: {
      'portal.name': portalName,
      'portal.operation': operation,
      'service.name': 'transbotai'
    }
  });
};

export const recordPortalError = (span: any, error: Error) => {
  span.recordException(error);
  span.setStatus({ code: 2, message: error.message });
};

export const endPortalSpan = (span: any) => {
  span.end();
};