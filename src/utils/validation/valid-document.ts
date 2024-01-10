import { formatDocument } from '../format/format-document';

export const isNumeric = (doc: string): boolean => /^\d+$/.test(doc);

export const validDocument = (doc: string): boolean => {
  const docFormat = formatDocument(doc);
  const isValidNumeric = isNumeric(docFormat);
  return isValidNumeric && (docFormat.length === 11 || docFormat.length === 14);
};