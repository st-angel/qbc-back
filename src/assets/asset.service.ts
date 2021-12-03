import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Asset } from './asset.model';
import { ASSET_TYPE } from './asset.model';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel('Asset') private readonly assetMoDB: Model<Asset>,
    @InjectModel('AssetBusiness')
    private readonly assetBusinessMoDB: Model<Asset>,
  ) {}

  async createAsset(name: string, price: number, percentage: number) {
    const newAsset = new this.assetMoDB({
      assetName: name,
      assetPrice: price,
      assetPercentage: percentage,
    });
    const result = await newAsset.save();

    return result._id;
  }

  async getAllAssets() {
    const assets = await this.assetMoDB.find().exec();

    return assets as Asset[];
  }

  async getAssetsByAssetType(assetType: ASSET_TYPE) {
    const assets = (await this.assetMoDB.find().exec()).filter(
      (asset) => asset.assetType === assetType,
    );

    return assets as Asset[];
  }

  async getAssetById(assetId: string) {
    const asset = await this.assetBusinessMoDB.findOne({ assetId: assetId });

    return asset;
  }
}
