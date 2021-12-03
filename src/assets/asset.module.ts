import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { assetSchema, assetBusinessSchema } from './asset.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Asset', schema: assetSchema }]),
    MongooseModule.forFeature([
      { name: 'AssetBusiness', schema: assetBusinessSchema },
    ]),
  ],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
