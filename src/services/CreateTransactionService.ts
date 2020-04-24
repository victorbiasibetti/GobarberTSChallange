import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Transaction): Transaction {
    // Não deve ser possível criar uma transação que extrapole o que o usuário tem em caixa
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total - value < 0) {
        throw Error('This outome is not to be a negative balance');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
      id: '',
    });
    return transaction;
  }
}

export default CreateTransactionService;
