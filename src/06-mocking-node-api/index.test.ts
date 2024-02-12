// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 500);
    expect(setTimeout).toHaveBeenCalledWith(callback, 500);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 500;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 500;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 500;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1500);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const fakePath = '/fakePath.txt';
    await readFileAsynchronously(fakePath);
    expect(joinSpy).toHaveBeenCalled();
    expect(joinSpy).toHaveBeenCalledWith(__dirname, fakePath);
  });

  test('should return null if file does not exist', async () => {
    fs.existsSync = jest.fn(() => false);
    await expect(readFileAsynchronously('/fakePath.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fakeContent = 'fake content';
    fs.existsSync = jest.fn(() => true);
    fs.promises.readFile = jest.fn().mockResolvedValue(fakeContent);
    await expect(readFileAsynchronously('')).resolves.toBe(fakeContent);
  });
});
