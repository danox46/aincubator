"use strict";
// sum.test.ts
const sum = (a, b) => {
    return a + b;
};
describe('sum function', () => {
    it('adds two numbers', () => {
        expect(sum(2, 3)).toBe(5);
    });
    it('handles negative numbers', () => {
        expect(sum(-1, 1)).toBe(0);
    });
});
//# sourceMappingURL=e2e.test.js.map