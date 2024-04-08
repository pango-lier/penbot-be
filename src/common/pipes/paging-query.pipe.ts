import { PagingOrderEnum } from '@common/types/paging.type';
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isArray, isNumber, isNumberString, isString } from 'class-validator';

@Injectable()
export class PagingQueryPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    if (
      value?.startRow &&
      value?.endRow &&
      undefined !== value.startRow &&
      undefined !== value.endRow &&
      '' !== value.startRow.toString().trim() &&
      '' !== value.endRow.toString().trim()
    ) {
      if (!isNumber(value.startRow) && !isNumberString(value.startRow)) {
        throw new UnprocessableEntityException('startRow must be number');
      } else {
        value.startRow = parseInt(value.startRow, 10);
      }

      if (!isNumber(value.endRow) && !isNumberString(value.endRow)) {
        throw new UnprocessableEntityException('endRow must be number');
      } else {
        value.endRow = parseInt(value.endRow, 10);

        if (value.startRow >= value.endRow) {
          throw new UnprocessableEntityException(
            'startRow must be less than endRow',
          );
        }
      }
    } else {
      delete value.startRow;
      delete value.endRow;
    }

    if (
      value?.sortModel &&
      undefined !== value.sortModel &&
      '' !== value.sortModel.toString().trim()
    ) {
      if (!isArray(value.sortModel)) {
        throw new UnprocessableEntityException('sortModel must be array');
      }

      if (value.sortModel.length) {
        value.sortModel = value.sortModel.map((item) => {
          if (isString(item)) {
            try {
              item = JSON.parse(item);
            } catch (error) {
              throw new UnprocessableEntityException(error);
            }
          }
          if (item?.sort && item?.colId) {
            throw new UnprocessableEntityException(
              'sortModel must be array of colId and sort',
            );
          }
          if (item.sort) {
            item.sort = item.sort.toString().toLowerCase();
            if (!Object.values(PagingOrderEnum).includes(item.sort)) {
              item.sort = PagingOrderEnum.asc;
            }
          }
          return item;
        });
      } else {
        delete value.sortModel;
      }
    }

    return value;
  }
}
