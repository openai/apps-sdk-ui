export function filenameToTitleCase(filename: string): string {
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "")
  const sanitized = nameWithoutExtension.replace(/[^a-zA-Z0-9]+/g, " ")

  return sanitized.trim().split(/\s+/).map(capitalize).join(" ")
}

export function kebabCaseToPascalCase(name: string): string {
  const sanitized = name.replace(/[^a-zA-Z0-9]+/g, " ")

  return sanitized.trim().split(/\s+/).map(capitalize).join("")
}

export function capitalize<T extends string>(str: T): Capitalize<string> {
  if (!str) {
    return ""
  }
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<string>
}
