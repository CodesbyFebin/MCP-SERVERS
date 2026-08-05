export function createEmptySearchIndex() {
  return {
    type: "empty",
    created: new Date().toISOString(),
    documents: [],
  };
}