import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { BillsModule } from './bills/bills.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [BillsModule]
})
export class PaymentsModule {}
