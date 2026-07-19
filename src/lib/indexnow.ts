export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface IndexNowResponse {
  status: number;
  message: string;
}

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

export async function submitToIndexNow(payload: IndexNowPayload): Promise<IndexNowResponse> {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  if (!response.ok) {
    let message = text.trim() || response.statusText;
    if (response.status === 400) message = "Invalid request format";
    else if (response.status === 403) message = "Key not valid";
    else if (response.status === 422) message = "URLs don't belong to host or key mismatch";
    else if (response.status === 429) message = "Too many requests";
    throw new Error(`IndexNow ${response.status}: ${message}`);
  }

  return { status: response.status, message: text.trim() || "OK" };
}

export function buildIndexNowPayload(options: {
  host: string;
  key: string;
  keyLocation: string;
  urls: string[];
}): IndexNowPayload {
  return {
    host: options.host,
    key: options.key,
    keyLocation: options.keyLocation,
    urlList: options.urls,
  };
}