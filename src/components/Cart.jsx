import { useId } from "react";
import { useCart } from "../vendor/hooks/useCart";
import { CartIcon, ClearCartIcon } from "./Icons";
import './carrito.css';

function CartItem({ thumbnail, title, price, quantity, addToCart, removeFromCart }) {
    return(
        <table className="border-spacing-2">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src={ thumbnail} alt="" /></td>
                    <td>{ title }</td>
                    <td>{ quantity } <button onClick={addToCart}>+</button></td>
                    <td>{ price }</td>
                </tr>
            </tbody>
        </table>
    );
}

export function Cart() {
    const cartCheckboxId = useId();

    const { cart, clearCart, addToCart } = useCart();
    
    const cantProductos = cart.reduce((total, product) => total + product.quantity, 0);
    const totalPagar = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <>
            <label className="cart-button" htmlFor={ cartCheckboxId }>
                <CartIcon/>
            </label> 
            <input id={ cartCheckboxId } type="checkbox" hidden/>

            <div className="carrito">
                <ul>
                    {
                        cart.map( product => (
                            <CartItem
                                key={ product.id }
                                addToCart={ () => addToCart(product) }
                                { ...product }
                            />
                        ))
                    }
                </ul>
                <div className="overflow-auto rounded-lg shadow">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Image</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Product Name</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Quantity</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Unit Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="bg-white">
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap"><img src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg" alt="" /></td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider">Iphone 9</span>
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap"><input type="number" value={2}/></td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">549</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="p-3 text-sm text-gray-700"><img src="https://cdn.dummyjson.com/product-images/2/thumbnail.jpg" alt="" /></td>
                                <td className="p-3 text-sm text-gray-700">
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider">Iphone X</span>
                                </td>
                                <td className="p-3 text-sm text-gray-700"><input type="number" value={1}/></td>
                                <td className="p-3 text-sm text-gray-700">899</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                
                <div className="totales">
                    <p>Productos: {cantProductos}</p>
                    <p>Total: ${totalPagar}</p>

                    <button 
                        style={{ backgroundColor: 'red' }}
                        onClick={ clearCart }>
                        <ClearCartIcon/>
                    </button>
                    <button
                        style={{ backgroundColor: 'Skyblue'}}>
                        <CartIcon/>
                    </button>
                </div>
            </div>
        </>
    )
}