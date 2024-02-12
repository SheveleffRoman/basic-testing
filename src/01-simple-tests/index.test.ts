// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const case1 = {
      a: 1,
      b: 2,
      action: Action.Add,
    };
    const case2 = {
      a: 3,
      b: -3,
      action: Action.Add,
    };

    expect(simpleCalculator(case1)).toEqual(3);
    expect(simpleCalculator(case2)).toEqual(0);
  });

  test('should subtract two numbers', () => {
    const case1 = {
      a: 1,
      b: 2,
      action: Action.Subtract,
    };
    const case2 = {
      a: 10,
      b: 6,
      action: Action.Subtract,
    };
    expect(simpleCalculator(case1)).toEqual(-1);
    expect(simpleCalculator(case2)).toEqual(4);
  });

  test('should multiply two numbers', () => {
    const case1 = {
      a: 2,
      b: 2,
      action: Action.Multiply,
    };
    const case2 = {
      a: -2,
      b: 6,
      action: Action.Multiply,
    };
    const case3 = {
      a: 0,
      b: 7,
      action: Action.Multiply,
    };
    expect(simpleCalculator(case1)).toEqual(4);
    expect(simpleCalculator(case2)).toEqual(-12);
    expect(simpleCalculator(case3)).toEqual(0);
  });

  test('should divide two numbers', () => {
    const case1 = {
      a: 10,
      b: 5,
      action: Action.Divide,
    };
    const case2 = {
      a: 20,
      b: -5,
      action: Action.Divide,
    };
    const case3 = {
      a: 5,
      b: 0,
      action: Action.Divide,
    };
    expect(simpleCalculator(case1)).toEqual(2);
    expect(simpleCalculator(case2)).toEqual(-4);
    expect(simpleCalculator(case3)).toEqual(Infinity);
  });

  test('should exponentiate two numbers', () => {
    const case1 = {
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    };
    const case2 = {
      a: 1,
      b: 5,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(case1)).toEqual(125);
    expect(simpleCalculator(case2)).toEqual(1);
  });

  test('should return null for invalid action', () => {
    const case1 = {
      a: 5,
      b: 3,
      action: '=-*',
    };
    expect(simpleCalculator(case1)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const case1 = {
      a: '5',
      b: 5,
      action: Action.Multiply,
    };
    expect(simpleCalculator(case1)).toBeNull();
  });
});
