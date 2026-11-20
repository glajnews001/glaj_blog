import { NextResponse } from "next/server";

/** Error that route handlers convert into a JSON response with the given status. */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export const ok = <T>(data: T, status = 200) => NextResponse.json({ ok: true, data }, { status });

export const fail = (message: string, status = 400) =>
  NextResponse.json({ ok: false, error: message }, { status });

/** Wraps a handler so thrown HttpErrors become clean JSON errors. */
export async function handle(run: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return await run();
  } catch (error) {
    if (error instanceof HttpError) return fail(error.message, error.status);
    console.error(error);
    return fail("Something went wrong. Please try again.", 500);
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
