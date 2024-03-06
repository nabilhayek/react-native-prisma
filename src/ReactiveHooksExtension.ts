import { Prisma } from '@prisma/client/rn';
import { useEffect, useState } from 'react';

export const reactiveHooksExtension = Prisma.defineExtension((client) => {
  const subscribedQueries: Record<
    string,
    {
      callbacks: Record<string, (data: any) => void>;
      query: () => Promise<any>;
    }
  > = {};

  const refreshSubscriptions = async () => {
    for (const key in subscribedQueries) {
      const subscription = subscribedQueries[key]!;

      const data = await subscription.query();

      for (const callbackKey in subscription.callbacks) {
        const callback = subscription.callbacks[callbackKey]!;
        callback(data);
      }
    }
  };

  return client.$extends({
    name: 'prisma-reactive-hooks-extension',
    model: {
      $allModels: {
        useFindMany<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'findMany'>>
        ): Prisma.Result<T, A, 'findMany'> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.findMany(args);

          const [engineResponse, setEngineResponse] = useState<any>();

          useEffect(() => {
            const key = `${model} :: findMany :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: findMany :: ${JSON.stringify(
              args
            )} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key]!.callbacks[callbackKey] =
                setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse,
                },
                query: () => model.findMany(args),
              };
            }

            prismaPromise.then(setEngineResponse);

            return () => {
              delete subscribedQueries[key]!.callbacks[callbackKey];
            };
          }, []);

          return engineResponse;
        },
        useFindUnique<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'findUnique'>>
        ): Prisma.Result<T, A, 'findUnique'> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.findUnique(args);

          const [engineResponse, setEngineResponse] = useState<any>();

          useEffect(() => {
            const key = `${model} :: findUnique :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: findUnique :: ${JSON.stringify(
              args
            )} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key]!.callbacks[callbackKey] =
                setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse,
                },
                query: () => model.findUnique(args),
              };
            }

            prismaPromise.then(setEngineResponse);

            return () => {
              delete subscribedQueries[key]!.callbacks[callbackKey];
            };
          }, []);

          return engineResponse;
        },
        useFindFirst<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'findFirst'>>
        ): Prisma.Result<T, A, 'findFirst'> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.findFirst(args);

          const [engineResponse, setEngineResponse] = useState<any>();

          useEffect(() => {
            const key = `${model} :: findFirst :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: findFirst :: ${JSON.stringify(
              args
            )} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key]!.callbacks[callbackKey] =
                setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse,
                },
                query: () => model.findFirst(args),
              };
            }

            prismaPromise.then(setEngineResponse);

            return () => {
              delete subscribedQueries[key]!.callbacks[callbackKey];
            };
          }, []);

          return engineResponse;
        },
        async create<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'create'>>
        ): Promise<Prisma.Result<T, A, 'create'>> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.create(args);
          const data = await prismaPromise;
          await refreshSubscriptions();

          return data;
        },
        async createMany<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'createMany'>>
        ): Promise<Prisma.Result<T, A, 'createMany'>> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.createMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();

          return data;
        },
        async delete<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'delete'>>
        ): Promise<Prisma.Result<T, A, 'delete'>> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.delete(args);
          const data = await prismaPromise;
          await refreshSubscriptions();

          return data;
        },
        async deleteMany<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'deleteMany'>>
        ): Promise<Prisma.Result<T, A, 'deleteMany'>> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.deleteMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();

          return data;
        },
        async update<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'update'>>
        ): Promise<Prisma.Result<T, A, 'update'>> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.update(args);
          const data = await prismaPromise;
          await refreshSubscriptions();

          return data;
        },
        async updateMany<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'updateMany'>>
        ): Promise<Prisma.Result<T, A, 'updateMany'>> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.updateMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();

          return data;
        },
        async upsert<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'upsert'>>
        ): Promise<Prisma.Result<T, A, 'upsert'>> {
          const ctx = Prisma.getExtensionContext(this);
          const model = (ctx.$parent as any)[ctx.$name!];
          const prismaPromise = model.upsert(args);
          const data = await prismaPromise;
          await refreshSubscriptions();

          return data;
        },
      },
    },
  });
});
