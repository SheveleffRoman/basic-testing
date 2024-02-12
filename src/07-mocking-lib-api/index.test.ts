// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const path_to = 'users';
const baseURL = 'https://jsonplaceholder.typicode.com';
const data = { value: 'fake data' };

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(path_to);
    expect(axiosSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const getFunc = jest.fn().mockResolvedValue({ data });
    axios.create = jest.fn().mockImplementation(() => ({
      baseURL,
      get: getFunc,
    }));

    await throttledGetDataFromApi(path_to);
    expect(getFunc).toHaveBeenCalledWith(path_to);
  });

  test('should return response data', async () => {
    axios.create = jest.fn().mockImplementation(() => ({
      baseURL,
      get: jest.fn().mockResolvedValue({ data }),
    }));

    const result = await throttledGetDataFromApi(path_to);
    expect(result).toBe(data);
  });
});
