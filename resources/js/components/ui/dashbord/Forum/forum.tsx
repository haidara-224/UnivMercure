import { NavTabsForum } from '@/components/NavTabsForum';
import SeetingForum from '@/components/SeetingForum';


import StatistiqueForum from '@/components/StatustiqueForum';
import Topics from '@/components/Topics';

import { Suject } from '@/types';
import { Head, Link } from '@inertiajs/react';
interface propsForum{
    sujet:Suject[],
    nbPost:number,
    nbForum:number
    nbPostUser:number
}

export default function ForumAdmin( {sujet,nbForum,nbPost,nbPostUser}:propsForum) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head title="Administration du Forum" />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Administration du Forum</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <StatistiqueForum nbForum={nbForum} nbPost={nbPost} nbPostUser={nbPostUser}/>
        <Link href='/dashboard/forum/category' className='bg-blue-600 text-white p-3 rounded hover:bg-blue-900'>Category Forum</Link>

        <div className="mb-6">

        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
             <NavTabsForum
                childrenByTab={{
                    'nav-1': <Topics Sujet={sujet}  />,

                    'nav-2': <SeetingForum />,
                }}
            />
        </div>
      </main>
    </div>
  );
}
