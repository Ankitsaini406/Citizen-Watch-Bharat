import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ChildLayout({ children }: { children: React.ReactNode }) {
    return(
        <>
        <Header />
        {children}
        <Footer />
        </>
    )
}