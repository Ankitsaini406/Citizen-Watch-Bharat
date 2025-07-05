import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TailwindIndicator from "@/lib/TailwindIndicator";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
    return(
        <>
        <Header />
        {children}
        <TailwindIndicator />
        <Footer />
        </>
    )
}