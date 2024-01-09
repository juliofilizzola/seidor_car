import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    await this.middlewareSoftDelete();
    await this.middlewareListSoftDelete();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async middlewareSoftDelete() {
    this.$use(async (params, next) => {
      if (params.action == 'delete') {
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }

      if (params.action == 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deletedAt'] = new Date();
        } else {
          params.args['data'] = { deletedAt: new Date() };
        }
      }

      return next(params);
    });
  }

  async middlewareListSoftDelete() {
    this.$use(async (params, next) => {
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst';
        if (!params.args.where['deletedAt']) {
          params.args.where = {
            ...params.args.where,
            deletedAt: null,
          };
        }
      }

      if (params.action == 'findMany') {
        if (params.args.where) {
          if (params.args.where.deletedAt == undefined) {
            params.args.where = {
              ...params.args.where,
              deletedAt: null,
            };
          }
        } else {
          params.args['where'] = { ...params.args.where, deletedAt: null };
        }
      }

      if (params.action == 'aggregate' && params.dataPath.includes('_count')) {
        if (params.args.where != undefined) {
          if (params.args.where.deletedAt == undefined) {
            params.args.where = { ...params.args.where, deletedAt: null };
          }
        } else {
          params.args['where'] = { ...params.args.where, deletedAt: null };
        }
      }

      return next(params);
    });
  }
}
