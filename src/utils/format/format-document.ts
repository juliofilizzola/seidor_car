export const formatDocument = (doc: string): string => {
  return doc.replace(/[./\-\\ ]/g, '');
};
