
import Footer from "@/components/footer";
import Header from "@/components/header";
import CategoriesSection from "@/components/categories/categorySection";
import CategoryProducts from "@/components/categories/categoryProducts";



export default function Page () {

    return (
        <>
            <Header/>

            <CategoriesSection/>
            
            <CategoryProducts/>

            <Footer/>
        </>
    )
}