// Imports 

import { expect } from 'chai';
import { generateSlug } from '../src/utils/generateSlug.js'

describe('generateSlug', function() {
  
  it('should generate a correct slug for a simple name', function() {
    const result = generateSlug('Test Article', 123);
    expect(result).to.equal('test-article-123');
  });

  it('should generate a correct slug with accents and special characters', function() {
    const result = generateSlug("Test", 456);
    expect(result).to.equal('test-456');
  });

  it('should handle extra spaces and return a valid slug', function() {
    const result = generateSlug('  Vue d\'ensemble   ', 789);
    expect(result).to.equal('vue-densemble-789');
  });

  it('should remove non-alphanumeric characters', function() {
    const result = generateSlug('Mon film #1 !!!', 101);
    expect(result).to.equal('mon-film-1-101');
  });

  it('should remove leading and trailing dashes', function() {
    const result = generateSlug('  --Titre De l\'Article--  ', 102);
    expect(result).to.equal('titre-de-larticle-102');
  });

  it('should handle empty strings', function() {
    const result = generateSlug('', 1000);
    expect(result).to.equal('1000');  // Assuming you want just the ID if the name is empty
  });

});