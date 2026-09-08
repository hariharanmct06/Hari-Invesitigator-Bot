import { Case, Evidence, StructuredAIAnswer } from '../types/investigation';

export interface AIChatResponse {
  success: boolean;
  data?: StructuredAIAnswer & { summaryText?: string };
  error?: string;
}

/**
 * Client-Side AI Service Component
 * 
 * SECURITY COMPLIANCE:
 * 1. ZERO API keys are embedded or accessed on the client-side.
 * 2. Communicates strictly with server endpoint /api/chat.
 * 3. Never reads localStorage or client env vars for keys.
 */
export async function sendQueryToAIChat(
  query: string,
  currentCase: Case | null,
  evidence: Evidence[]
): Promise<AIChatResponse> {
  try {
    const payload = {
      query,
      caseContext: currentCase
        ? {
            caseNumber: currentCase.caseNumber,
            title: currentCase.title,
            caseType: currentCase.caseType,
            incidentDate: currentCase.incidentDate,
            location: currentCase.location,
            status: currentCase.status
          }
        : null,
      evidenceContext: evidence.map(e => ({
        id: e.id,
        evidenceId: e.evidenceId,
        title: e.title,
        category: e.category,
        status: e.status
      }))
    };

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          error: 'Rate limit exceeded. Please wait a moment before sending more requests.'
        };
      }
      return {
        success: false,
        error: 'Backend API error while communicating with AI service.'
      };
    }

    const result = await response.json();
    if (result.success && result.data) {
      return {
        success: true,
        data: result.data
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to parse AI response.'
    };
  } catch (err) {
    return {
      success: false,
      error: 'Network connectivity error. Could not reach server proxy endpoint.'
    };
  }
}
