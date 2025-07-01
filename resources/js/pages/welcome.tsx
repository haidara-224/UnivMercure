import { Head, usePage } from "@inertiajs/react";

import { Headers } from "@/components/LandingPage/Headers";
import Hero from "@/components/LandingPage/Hero";
import Stat from "@/components/LandingPage/Stat";
import ProgramPopular from "@/components/LandingPage/ProgramPopular";
import CampusSection from "@/components/LandingPage/CampusLocalisation";
import VideoPresentation from "@/components/LandingPage/VideoPresentation";
import Testimonial from "@/components/LandingPage/Testimonial";
import NewsEventCard from "@/components/LandingPage/Event";
import { FAQSection } from "@/components/LandingPage/Faq";
import ElementDecoratif from "@/components/LandingPage/ElementDecoratif";
import Footers from "@/components/LandingPage/Footer";
import WelcomeLayout from "@/layouts/WelcomeLayout";
import { Evenements } from "@/types";
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    evenements: Evenements[]
}
export default function Welcome() {
    const { evenements } = usePage<CustomPageProps>().props;
    return (
        <>
            <WelcomeLayout>
                <Head title="Université Mercure International">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />
                    <meta name="description" content="Université Mercure International de Conakry - Formations de qualité en commerce, gestion, informatique, droit, communication et plus encore." />
                </Head>
                <Headers />
                <main>
                    <section className="relative h-screen flex items-center justify-center overflow-hidden">
                        <Hero />
                    </section>
                    <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
                        <div className="container mx-auto px-6">
                            <Stat />
                        </div>
                    </section>
                    <section className="py-16 bg-gray-50">
                        <ProgramPopular />
                    </section>
                    <section className="py-16 bg-gray-100 dark:bg-gray-900">
                        <CampusSection />
                    </section>
                    <section className="py-16 bg-white">
                        <VideoPresentation />
                    </section>
                    <section className="py-16 bg-gray-50">
                        <Testimonial />
                    </section>
                    <section className="py-16 bg-white">
                        <NewsEventCard events={evenements} />
                    </section>
                    <section className="py-16 bg-gray-50">
                        <FAQSection />
                    </section>
                    <section className="relative py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white overflow-hidden">
                        <ElementDecoratif />
                    </section>


                </main>
                <Footers />
            </WelcomeLayout>

        </>
    );
}
