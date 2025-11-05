import { ProductType } from "@/services/productsServices";
import HeaderSection from "./headerSection";
import HeaderTop from "./headerTop";

export default function Header({ products }:{products:ProductType[]}){
    return (
        <>
            <HeaderTop products={products}/>
            <HeaderSection/>
        </>
    )
}