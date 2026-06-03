import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
  GoogleGenerativeAIResponseError,
} from '@google/generative-ai';

/** @type {const} */
export const GEMINI_MODEL = 'gemini-2.5-flash';

const DEFAULT_GENERATION = {
  temperature: 0.7,
  maxOutputTokens: 2048,
};

/**
 * @returns {string}
 */
export function getGeminiApiKey() {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return typeof key === 'string' ? key.trim() : '';
}

/** @returns {boolean} */
export function isGeminiConfigured() {
  return getGeminiApiKey().length > 0;
}

/**
 * @param {string} text
 * @returns {string}
 */
export function normalizeResponseText(text) {
  if (!text) return '';
  return text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * @param {import('@google/generative-ai').EnhancedGenerateContentResponse} response
 * @returns {{ ok: true, text: string } | { ok: false, error: string, code?: string }}
 */
export function extractTextFromResponse(response) {
  const blockReason = response.promptFeedback?.blockReason;
  if (blockReason) {
    return {
      ok: false,
      error: 'The request was blocked by safety filters. Try rephrasing your question.',
      code: 'PROMPT_BLOCKED',
    };
  }

  const candidate = response.candidates?.[0];
  if (!candidate?.content?.parts?.length) {
    const finish = candidate?.finishReason;
    if (finish === 'SAFETY' || finish === 'PROHIBITED_CONTENT') {
      return {
        ok: false,
        error: 'The model could not produce a safe response. Try a different question.',
        code: 'RESPONSE_BLOCKED',
      };
    }
    return {
      ok: false,
      error: 'No response was generated. Please try again.',
      code: 'EMPTY_RESPONSE',
    };
  }

  try {
    const text = normalizeResponseText(response.text());
    if (!text) {
      return { ok: false, error: 'The model returned an empty response.', code: 'EMPTY_TEXT' };
    }
    return { ok: true, text };
  } catch (err) {
    return {
      ok: false,
      error: formatGeminiError(err),
      code: 'TEXT_EXTRACTION_FAILED',
    };
  }
}

/**
 * @param {unknown} error
 * @returns {string}
 */
export function formatGeminiError(error) {
  if (error instanceof GoogleGenerativeAIFetchError) {
    const detail = error.errorDetails?.[0];
    const detailMessage =
      detail && typeof detail === 'object' && 'message' in detail
        ? String(detail.message)
        : null;
    if (error.status === 429) {
      return 'Gemini rate limit reached. Please wait a moment and try again.';
    }
    if (error.status === 401 || error.status === 403) {
      return 'Invalid or unauthorized Gemini API key. Check VITE_GEMINI_API_KEY.';
    }
    return detailMessage || error.message || 'Gemini API request failed.';
  }

  if (error instanceof GoogleGenerativeAIResponseError) {
    return error.message || 'Gemini returned an unexpected response.';
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while contacting Gemini.';
}

/**
 * @param {{ systemInstruction?: string, generationConfig?: import('@google/generative-ai').GenerationConfig }} [options]
 * @returns {import('@google/generative-ai').GenerativeModel | null}
 */
export function getGenerativeModel(options = {}) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const client = new GoogleGenerativeAI(apiKey);
  const { systemInstruction, generationConfig } = options;

  return client.getGenerativeModel({
    model: GEMINI_MODEL,
    ...(systemInstruction ? { systemInstruction } : {}),
    generationConfig: { ...DEFAULT_GENERATION, ...generationConfig },
  });
}

/**
 * @returns {{ ok: false, error: string, code: string }}
 */
function missingKeyResult() {
  return {
    ok: false,
    error: 'Gemini is not configured. Add VITE_GEMINI_API_KEY to your environment.',
    code: 'MISSING_API_KEY',
  };
}

/**
 * @param {string} prompt
 * @param {{ generationConfig?: import('@google/generative-ai').GenerationConfig }} [options]
 * @returns {Promise<{ ok: true, text: string } | { ok: false, error: string, code?: string }>}
 */
export async function generateText(prompt, options = {}) {
  const trimmed = prompt?.trim();
  if (!trimmed) {
    return { ok: false, error: 'Prompt cannot be empty.', code: 'INVALID_PROMPT' };
  }

  const model = getGenerativeModel({ generationConfig: options.generationConfig });
  if (!model) return missingKeyResult();

  try {
    const result = await model.generateContent(trimmed);
    return extractTextFromResponse(result.response);
  } catch (error) {
    return { ok: false, error: formatGeminiError(error), code: 'GENERATION_FAILED' };
  }
}

/**
 * @param {string} systemInstruction
 * @param {string} userMessage
 * @param {{ generationConfig?: import('@google/generative-ai').GenerationConfig }} [options]
 * @returns {Promise<{ ok: true, text: string } | { ok: false, error: string, code?: string }>}
 */
export async function generateTextWithSystem(systemInstruction, userMessage, options = {}) {
  const message = userMessage?.trim();
  const system = systemInstruction?.trim();
  if (!system) {
    return { ok: false, error: 'System instruction cannot be empty.', code: 'INVALID_SYSTEM' };
  }
  if (!message) {
    return { ok: false, error: 'Message cannot be empty.', code: 'INVALID_MESSAGE' };
  }

  const model = getGenerativeModel({
    systemInstruction: system,
    generationConfig: options.generationConfig,
  });
  if (!model) return missingKeyResult();

  try {
    const result = await model.generateContent(message);
    return extractTextFromResponse(result.response);
  } catch (error) {
    return { ok: false, error: formatGeminiError(error), code: 'GENERATION_FAILED' };
  }
}

/**
 * @param {string} prompt
 * @param {{ onChunk: (chunk: string) => void, generationConfig?: import('@google/generative-ai').GenerationConfig }} options
 * @returns {Promise<{ ok: true, text: string } | { ok: false, error: string, code?: string }>}
 */
/**
 * @param {import('@google/generative-ai').GenerativeModel} model
 * @param {string} content
 * @param {{ onChunk: (chunk: string) => void, signal?: AbortSignal }} options
 * @returns {Promise<{ ok: true, text: string } | { ok: false, error: string, code?: string }>}
 */
async function consumeContentStream(model, content, options) {
  const requestOptions = options.signal ? { signal: options.signal } : undefined;

  try {
    const streamResult = await model.generateContentStream(content, requestOptions);
    let aggregated = '';

    for await (const chunk of streamResult.stream) {
      if (options.signal?.aborted) {
        return { ok: false, error: 'Request cancelled.', code: 'ABORTED' };
      }

      let piece = '';
      try {
        piece = chunk.text();
      } catch {
        continue;
      }
      if (!piece) continue;
      aggregated += piece;
      options.onChunk(piece);
    }

    const final = await streamResult.response;
    const fromFinal = extractTextFromResponse(final);
    if (fromFinal.ok) {
      return { ok: true, text: fromFinal.text };
    }

    const fallback = normalizeResponseText(aggregated);
    if (fallback) {
      return { ok: true, text: fallback };
    }

    return fromFinal;
  } catch (error) {
    if (options.signal?.aborted) {
      return { ok: false, error: 'Request cancelled.', code: 'ABORTED' };
    }
    return { ok: false, error: formatGeminiError(error), code: 'STREAM_FAILED' };
  }
}

/**
 * @param {string} prompt
 * @param {{ onChunk: (chunk: string) => void, generationConfig?: import('@google/generative-ai').GenerationConfig, signal?: AbortSignal }} options
 * @returns {Promise<{ ok: true, text: string } | { ok: false, error: string, code?: string }>}
 */
export async function streamText(prompt, options) {
  const trimmed = prompt?.trim();
  if (!trimmed) {
    return { ok: false, error: 'Prompt cannot be empty.', code: 'INVALID_PROMPT' };
  }
  if (typeof options?.onChunk !== 'function') {
    return { ok: false, error: 'onChunk callback is required.', code: 'INVALID_OPTIONS' };
  }

  const model = getGenerativeModel({ generationConfig: options.generationConfig });
  if (!model) return missingKeyResult();

  return consumeContentStream(model, trimmed, options);
}

/**
 * @param {string} systemInstruction
 * @param {string} userMessage
 * @param {{ onChunk: (chunk: string) => void, generationConfig?: import('@google/generative-ai').GenerationConfig, signal?: AbortSignal }} options
 * @returns {Promise<{ ok: true, text: string } | { ok: false, error: string, code?: string }>}
 */
export async function streamTextWithSystem(systemInstruction, userMessage, options) {
  const message = userMessage?.trim();
  const system = systemInstruction?.trim();
  if (!system) {
    return { ok: false, error: 'System instruction cannot be empty.', code: 'INVALID_SYSTEM' };
  }
  if (!message) {
    return { ok: false, error: 'Message cannot be empty.', code: 'INVALID_MESSAGE' };
  }
  if (typeof options?.onChunk !== 'function') {
    return { ok: false, error: 'onChunk callback is required.', code: 'INVALID_OPTIONS' };
  }

  const model = getGenerativeModel({
    systemInstruction: system,
    generationConfig: options.generationConfig,
  });
  if (!model) return missingKeyResult();

  return consumeContentStream(model, message, options);
}
