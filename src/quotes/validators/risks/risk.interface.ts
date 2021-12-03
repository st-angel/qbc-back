export interface Risk {
  //the annotated field (aka the main field)
  MAIN_NUM_VALUE: number;

  //the cross-validation field (aka the related field)
  CROSS_ANY_VALUE: any;

  //the message returned if the validation fails
  MESSAGE: string;
}

export interface AgeAndAssetRisk {
  //the annotated field (aka the main field)
  AGE: number;

  //the cross-validation field (aka the related field)
  ASSET_ID: string;
}
