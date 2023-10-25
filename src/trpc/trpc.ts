import {initTRPC, TRPCError} from '@trpc/server'
import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';

const t = initTRPC.create()
const middleware = t.middleware

const isAuthenticated = middleware(async (opts) => {
    const {getUser} = getKindeServerSession()
    const currentUser = getUser()

    if (!currentUser || !currentUser.id) {
        throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    return opts.next({
        ctx: {
            userId: currentUser.id,
            currentUser,
        }
    })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthenticated)
