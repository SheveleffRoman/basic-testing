// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.withdraw(50000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 10000;
    const bankAccount1 = getBankAccount(initialBalance);
    const bankAccount2 = getBankAccount(0);
    expect(() => bankAccount1.transfer(11000, bankAccount2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.transfer(3000, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.deposit(5000).getBalance()).toEqual(15000);
  });

  test('should withdraw money', () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.withdraw(7000).getBalance()).toEqual(3000);
  });

  test('should transfer money', () => {
    const initialBalance1 = 10000;
    const initialBalance2 = 3000;
    const bankAccount1 = getBankAccount(initialBalance1);
    const bankAccount2 = getBankAccount(initialBalance2);
    expect(bankAccount1.transfer(7000, bankAccount2).getBalance()).toEqual(
      3000,
    );
    expect(bankAccount2.getBalance()).toEqual(10000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    lodash.random = jest.fn(() => 1);
    const fetchedBalance = await bankAccount.fetchBalance();
    const typeOfFetchedBalance = typeof fetchedBalance;
    expect(typeOfFetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(3000)
      .mockReturnValueOnce(1);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(3000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 10000;
    const bankAccount = getBankAccount(initialBalance);
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(3000)
      .mockReturnValueOnce(0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
