import { TenantService } from '../tenant/tenant.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    private tenantService: TenantService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionModel.create({
      ...createTransactionDto,
      subdomain: await this.tenantService.validateSubdomain(),
    });
  }

  async findAll(): Promise<Transaction[]> {
    const subdomain = await this.tenantService.validateSubdomain();

    console.log(subdomain);

    return await this.transactionModel.findAll({
      where: {
        subdomain,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
