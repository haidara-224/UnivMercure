
import { Toaster } from 'sonner';
export default function WelcomeLayout({ children,  }: { children: React.ReactNode; }) {
    return (
        <>
            {children}
            <Toaster/>
        </>
    );
}
