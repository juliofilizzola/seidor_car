import { formatDocument } from '../format/format-document';

export const isNumeric = (doc: string): boolean => {
  return !!doc.replace(/[0-9]/g, '').length;
};

export const validDocument = (doc: string): boolean => {
  const docLength = formatDocument(doc);
  const isValidNumeric = isNumeric(doc);
  return isValidNumeric && (docLength.length === 11 || docLength.length === 14);
};
