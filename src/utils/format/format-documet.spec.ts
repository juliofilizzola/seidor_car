import { formatDocument } from './format-document';

describe('formatDocument', () => {
  it('removes spaces, periods and hyphens from the document', () => {
    const inputDocument = '123.456-789 01';
    const formattedDocument = formatDocument(inputDocument);
    const expectedOutput = '12345678901';
    expect(formattedDocument).toBe(expectedOutput);
  });

  it('keeps the document already formatted', () => {
    const inputDocument = '98765432109';
    const formattedDocument = formatDocument(inputDocument);
    const expectedOutput = '98765432109';
    expect(formattedDocument).toBe(expectedOutput);
  });

  it('remove extra spaces from the document', () => {
    const inputDocument = '  555.123-789  ';
    const formattedDocument = formatDocument(inputDocument);
    const expectedOutput = '555123789';
    expect(formattedDocument).toBe(expectedOutput);
  });

  it('returns an empty string for an empty document', () => {
    const inputDocument = '';
    const formattedDocument = formatDocument(inputDocument);
    const expectedOutput = '';
    expect(formattedDocument).toBe(expectedOutput);
  });
});
