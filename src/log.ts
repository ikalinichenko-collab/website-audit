let verbose = false;

export function setVerbose(v: boolean): void {
  verbose = v;
}

export function isVerbose(): boolean {
  return verbose;
}

export function logLine(msg: string): void {
  console.log(msg);
}

export function logDetail(msg: string): void {
  if (verbose) console.log(msg);
}
