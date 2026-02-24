// Polyfill for File constructor in Node.js environments
// This fixes compatibility issues with the @easyops-cn/docusaurus-search-local plugin

if (typeof globalThis.File === 'undefined') {
  // Import Blob from buffer for Node.js
  const { Blob } = require('buffer');
  
  // Create a minimal File polyfill
  class FilePolyfill extends Blob {
    constructor(parts, name = '', options = {}) {
      super(parts, options);
      this.name = name;
      this.lastModified = options.lastModified || Date.now();
    }
  }
  
  // Add to global scope
  globalThis.File = FilePolyfill;
  
  console.log('✓ File constructor polyfill loaded');
}