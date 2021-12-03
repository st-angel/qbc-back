import { Controller, Get, UseGuards } from '@nestjs/common';
import { AssetService } from './asset.service';

import { Asset } from './asset.model';
import { ASSET_TYPE } from './asset.model';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrivAuthGuard } from '../authorisation/guards/priv-auth.guard';

import { Privileges } from '../authorisation/decorators/privilege.decorator';
import { ASSETS_PRIV } from './asset.privileges';

@Controller()
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('assets')
  @UseGuards(JwtAuthGuard, PrivAuthGuard)
  @Privileges(ASSETS_PRIV.LIST_ASSETS)
  async getAssets(): Promise<Asset[]> {
    const assets = await this.assetService.getAllAssets();

    return assets;
  }

  @Get('assets/cars')
  @UseGuards(JwtAuthGuard, PrivAuthGuard)
  @Privileges(ASSETS_PRIV.LIST_ASSETS_CARS)
  async getCarAssets(): Promise<Asset[]> {
    const assets = await this.assetService.getAssetsByAssetType(ASSET_TYPE.CAR);

    return assets;
  }

  @Get('assets/bikes')
  @UseGuards(JwtAuthGuard, PrivAuthGuard)
  @Privileges(ASSETS_PRIV.LIST_ASSETS_BIKES)
  async getBikeAssets(): Promise<Asset[]> {
    const assets = await this.assetService.getAssetsByAssetType(
      ASSET_TYPE.BIKE,
    );

    return assets;
  }
}
