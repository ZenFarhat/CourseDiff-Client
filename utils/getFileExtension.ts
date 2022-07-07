export const getFileExtension = (value: string) => {
  const fileExtension = value.split(".").pop()
  switch (fileExtension) {
    case "js":
      return "javascript"
    case "ts":
      return "typescript"
    case "py":
      return "python"
    default:
      return fileExtension
  }
}
