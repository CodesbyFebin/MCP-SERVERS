export interface IncidentReport {
  serverId: string;
  timestamp: string;
  summary: string;
  rootCause?: string;
  suggestedFix?: string;
  affectedComponents?: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export async function generateIncidentReport(
  serverId: string,
  errorLogs: string[]
): Promise<IncidentReport> {
  const logSummary = errorLogs.slice(0, 5).join('\n');
  
  const severity: IncidentReport['severity'] = 
    errorLogs.some(log => log.includes('FATAL') || log.includes('CRITICAL')) 
      ? 'critical' 
      : errorLogs.length > 10 
        ? 'high' 
        : 'medium';

  return {
    serverId,
    timestamp: new Date().toISOString(),
    summary: `Detected ${errorLogs.length} error logs requiring attention`,
    rootCause: 'Potential configuration or connectivity issue',
    suggestedFix: 'Review recent configuration changes and verify external service connectivity',
    affectedComponents: ['authentication', 'database'],
    severity
  };
}