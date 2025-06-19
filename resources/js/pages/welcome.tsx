import ElementDecoratif from "@/components/LandingPage/ElementDecoratif";
import Footers from "@/components/LandingPage/Footer";

import { Headers } from "@/components/LandingPage/Headers";
import Hero from "@/components/LandingPage/Hero";
import ProgramPopular from "@/components/LandingPage/ProgramPopular";
import Stat from "@/components/LandingPage/Stat";
import Testimonial from "@/components/LandingPage/Testimonial";
import { Head } from "@inertiajs/react";


export default function Welcome() {


    return (
        <>
             <Head title="Université Mercure International">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />
            </Head>
            <Headers />
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <Hero />
            </section>
            <section className="py-16 bg-gray-50">
                <ProgramPopular />

            </section>
            <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
                <div className="container mx-auto px-6">
                    <Stat />
                </div>
            </section>
            <section className="py-16 bg-white">
                <Testimonial />
            </section>
            <section className="relative py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white overflow-hidden">
                <ElementDecoratif />
            </section>

            <Footers />




        </>
    );
}


