import * as mongoose from 'mongoose';

export interface Asset {
  id: string;
  assetId: string;
  assetType: string;
  assetLabel: string;
  assetName: string;
  assetPrice: number;
  assetPercentage: number;
}

//TO DO : The API response should be different from the interface and/or Schema
export interface AssetResponse {
  count: number;
  assets: Asset[];
}

export const enum ASSET_TYPE {
  CAR = 'C2',
  BIKE = 'B1',
  E_BIKE = 'B2',
}

export const assetSchema = new mongoose.Schema(
  {
    id: { type: String, required: false },
    assetId: { type: String, required: false },
    assetType: { type: String, required: false },
    assetTypeLabel: { type: String, required: false, select: false },
    assetName: { type: String, required: true },
    assetPrice: { type: Number, required: true, select: false },
    assetPercentage: { type: Number, required: false, select: false },
  },
  { collection: 'assets' },
);

export const assetBusinessSchema = new mongoose.Schema(
  {
    id: { type: String, required: false },
    assetId: { type: String, required: false },
    assetType: { type: String, required: false },
    assetTypeLabel: { type: String, required: false },
    assetName: { type: String, required: true },
    assetPrice: { type: Number, required: true },
    assetPercentage: { type: Number, required: false },
  },
  { collection: 'assets' },
);
