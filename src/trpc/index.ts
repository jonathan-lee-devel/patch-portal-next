import {privateProcedure, publicProcedure, router} from './trpc'
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';
import {TRPCError} from '@trpc/server';
import {db} from '@/db';

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const {getUser} = getKindeServerSession()
        const currentUser = getUser()

        if (!currentUser.id || !currentUser.email) {
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }

        const databaseUser = await db.user.findFirst({
            where: {
                id: currentUser.id,
            },
        })

        if (!databaseUser) {
            await db.user.create({
                data: {
                    id: currentUser.id,
                    email: currentUser.email,
                },
            })
        }

        return {success: true}
    }),
    test: privateProcedure.query(async ({ctx}) => {
        const {currentUser, userId} = ctx
        return {success: true}
    })
})

export type AppRouter = typeof appRouter
