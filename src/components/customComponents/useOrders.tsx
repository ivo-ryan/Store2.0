import { OrdersProps, userService } from "@/services/userService";
import { useEffect, useState } from "react"

export default function useOrders () {
    const [ orders, setOrders ] = useState<OrdersProps[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ change, setChange ] = useState<boolean>(false);

    const storedUser = typeof window !== "undefined"
    ? sessionStorage.getItem("user")
    : null;

    const updateOrderStatus = async (paymentId: number , status: "PAID" | "FAILED") => {
        if(!storedUser) return;

        const res = await userService.updateOrder(paymentId, status);
        setChange(prev => !prev);
        console.log(res);

    }

    useEffect(() => {
        const fetchData = async () => {

            if(!storedUser) return 

            try{
                setLoading(true);
                const res = await userService.getAllOrders();
                setOrders(res.data);
            }finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [change]);

    return {
        orders,
        loading,
        updateOrderStatus
    }
}