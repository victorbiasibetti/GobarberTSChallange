import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (incomeTotal, item: Transaction) => {
        if (item.type === 'income') return incomeTotal + item.value;
        return incomeTotal;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (outcomeTotal, item: Transaction) => {
        if (item.type === 'outcome') return outcomeTotal + item.value;
        return outcomeTotal;
      },
      0,
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
