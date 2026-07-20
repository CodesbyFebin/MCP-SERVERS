import { generateIncidentReport, IncidentReport } from './ai-incident-reporter';

export async function fetchAndAnalyzeErrors(serverId: string) {
  const lokiUrl = process.env.LOKI_URL;
  const lokiToken = process.env.LOKI_API_KEY;

  try {
    if (!lokiUrl || !lokiToken) {
      return { 
        status: 'error' as const, 
        message: 'Loki configuration not found. Set LOKI_URL and LOKI_API_KEY environment variables.' 
      };
    }

    const query = encodeURIComponent(`{server_id="${serverId}"} |= "ERROR" or |= "FATAL"`);
    const response = await fetch(`${lokiUrl}/loki/api/v1/query_range?query=${query}&limit=20`, {
      headers: {
        'Authorization': `Bearer ${lokiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Loki API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    const errorLogs = data.data.result.flatMap((res: any) => 
      res.values.map((val: [string, string]) => val[1])
    );

    if (errorLogs.length === 0) {
      return { status: 'healthy' as const, message: 'No recent errors found in logs.' };
    }

    console.log(`🤖 Analyzing ${errorLogs.length} error logs for server ${serverId}...`);
    const report = await generateIncidentReport(serverId, errorLogs);

    return {
      status: 'incident_detected' as const,
      report,
      rawLogCount: errorLogs.length
    };

  } catch (error) {
    console.error('Failed to fetch or analyze logs:', error);
    return { status: 'error' as const, message: 'Could not retrieve logs for analysis.' };
  }
}