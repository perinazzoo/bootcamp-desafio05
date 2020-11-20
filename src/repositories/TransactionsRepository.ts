import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Array<Transaction> {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Omit<Balance, 'total'>, transaction: Transaction) => {
        return {
          income:
            transaction.type === 'income'
              ? acc.income + transaction.value
              : acc.income,
          outcome:
            transaction.type === 'outcome'
              ? acc.outcome + transaction.value
              : acc.outcome,
        };
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
