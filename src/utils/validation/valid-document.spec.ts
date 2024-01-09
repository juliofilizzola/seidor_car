import { validDocument } from './valid-document';

describe('validDocument', () => {
  it('returns true for a valid document with 11 digits', () => {
    const validDocument11Digits = '123.456.789-01';
    const isValid = validDocument(validDocument11Digits);
    expect(isValid).toBe(true);
  });

  it('returns true for a valid document with 14 digits', () => {
    const validDocument14Digits = '12.345.678/9012-34';
    const isValid = validDocument(validDocument14Digits);
    expect(isValid).toBe(true);
  });

  it('returns false for a document with less than 11 digits', () => {
    const invalidDocument = '123.456-78';
    const isValid = validDocument(invalidDocument);
    expect(isValid).toBe(false);
  });

  it('returns false for a document with more than 14 digits', () => {
    const invalidDocument = '12.345.678/9012-3456';
    const isValid = validDocument(invalidDocument);
    expect(isValid).toBe(false);
  });

  it('returns false for a document with non-numeric characters', () => {
    const invalidDocument = 'ABC13.456-789';
    console.log(invalidDocument.length);
    const isValid = validDocument(invalidDocument);
    expect(isValid).toBe(false);
  });
});
