import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { Risk } from './risks/risk.interface';

/* Custom validator : validates a minimum numeric value and another equal value. */

export function IsMinAndValueRisk(
  property: string,
  risk: Risk,
  validationOptions: ValidationOptions = {
    message: risk.MESSAGE,
  },
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMinAndValueRisk',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'number' &&
            !(
              value < risk.MAIN_NUM_VALUE &&
              relatedValue === risk.CROSS_ANY_VALUE
            )
          );
        },
      },
    });
  };
}
