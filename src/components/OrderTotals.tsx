import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void /* Sera una funcion que no retora nada */
}

export default function OrderTotals({order, tip, placeOrder} : OrderTotalsProps) {

    /* Creamso un useMemo que cambiara unicamente cuando la (order) cambie */
    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    /* Este estado cambiara cuando hay acambio en (tip) la propina, o en el subtotal (subtotalAmount) */
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, subtotalAmount])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [subtotalAmount, tipAmount])
    /* Al usar useCallback, es lo mismo que useMemo, a diferencia de que cuando se usan las declaraciones, se llaman con () 
        const totalAmount = useCallback(() => subtotalAmount() + tipAmount(), [subtotalAmount, tipAmount])    
    */

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales Y Propina:</h2>
            <p>Subtotal a pagar:
                <span className="font-bold"> {formatCurrency(subtotalAmount)}</span>
            </p>

            <p>Propina:
                <span className="font-bold"> {formatCurrency(tipAmount)}</span>
            </p>

            <p>Total A Pagar:
                <span className="font-bold"> {formatCurrency(totalAmount)}</span>
            </p>
            
        </div>

        <button
            className={`w-full bg-black p-3 uppercase text-white font-bold mt-10 
                ${totalAmount === 0 ? 'disabled:opacity-10' : 'cursor-pointer'}`}
            disabled={totalAmount === 0}
            onClick={placeOrder}
        >
            Guardar Orden
        </button>
    
    </>
  )
}
