import {privateProcedure, publicProcedure, router} from './trpc'
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';
import {TRPCError} from '@trpc/server';
import User from "@/models/User";
import dbConnect from "@/lib/db-connect";

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const {getUser} = getKindeServerSession()
        const currentUser = getUser()

        if (!currentUser.id || !currentUser.email) {
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }

        await dbConnect()
        const databaseUser = await User.findOne({id: currentUser.id}).exec()
        if (!databaseUser) {
            await User.create({id: currentUser.id, email: currentUser.email})
        }

        return {success: true}
    }),
    test: privateProcedure.query(async ({ctx}) => {
        const {currentUser, userId} = ctx
        return {success: true}
    })
})

export type AppRouter = typeof appRouter
