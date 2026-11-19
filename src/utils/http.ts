import { NextResponse } from "next/server";

export function httpError(message: string, status = 400) {
  return Object.assign(new Error(message), { status });
}

export function jsonError(error: unknown) {
  const status =
    typeof error === "object" && error && "status" in error ? Number((error as { status: number }).status) : 500;
  const message = error instanceof Error ? error.message : "Something went wrong";
  return NextResponse.json({ message }, { status: Number.isFinite(status) ? status : 500 });
}

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}
