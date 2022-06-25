export function genSourceMapUrl(map: string): string {
  return `data:application/json;base64,${Buffer.from(map).toString('base64')}`;
}

export function getCodeWithSourcemap(code: string, map: string): string {
  code += `\n//# sourceMappingURL=${genSourceMapUrl(map)}`;

  return code;
}
