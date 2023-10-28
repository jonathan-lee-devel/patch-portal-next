import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';

export default function Home() {
  return (
      <>
      <MaxWidthWrapper className={'mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'}>
        <div className={'mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'}>
            <p className={'text-sm font-semibold text-gray-700'}>Welcome to PatchPortal</p>
        </div>
          <h1 className={'max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'}>
              Coming Soon...
          </h1>
          <h3 className={'max-w-2xl text-3xl font-semibold md:text-4xl lg:text-5xl mt-2'}>
              Feel free to register so you&apos;re ready to go when the site goes live!
          </h3>
          <Link href={'https://github.com/jonathan-lee-devel/patch-portal'} target={'_blank'} className={cn(buttonVariants({size: 'lg'}), 'mt-6')}>
              GitHub Repo
          </Link>
      </MaxWidthWrapper>
    </>
  )
}
