import { describe, expect, it } from 'vitest';
import { parseGitHubURI } from '../../src/utils';

describe('parseGitHubURI', () => {
  it('returns as is when given `org/repo` format', () => {
    expect(parseGitHubURI('aster-mnch/octoget')).toBe('aster-mnch/octoget');
  });

  it('returns `org/repo` when given a full URI', () => {
    expect(parseGitHubURI('https://github.com/aster-mnch/octoget')).toBe('aster-mnch/octoget');
  });

  it('throws "Invalid format" error when given invalid syntax', () => {
    expect(() => parseGitHubURI('invalid')).toThrow('Invalid format');
  });
});
