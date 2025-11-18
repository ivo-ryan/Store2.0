import { OrdersProps, userService } from "@/services/userService";
import { useEffect, useState } from "react"

export default function useOrders () {
    const [ orders, setOrders ] = useState<OrdersProps[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const user = sessionStorage.getItem("user");

            if(!user) return 

            try{
                setLoading(true);
                const res = await userService.getAllOrders();
                setOrders(res.data);
            }finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return {
        orders,
        loading
    }
}