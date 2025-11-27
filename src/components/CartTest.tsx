'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from '@/lib/store/features/cartSlice';

export default function CartTest() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const itemsCount = useAppSelector(selectCartItemsCount);
  
  const testProducts = [
    {
      _id: '1',
      name: 'Running Shoes',
      slug: 'running-shoes',
      price: 89.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
      stock: 10,
    },
    {
      _id: '2',
      name: 'Cotton T-Shirt',
      slug: 'cotton-t-shirt',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
      stock: 15,
    },
  ];
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Cart Test</h1>
      
      {/* Summary */}
      <div className="bg-blue-100 p-6 rounded-lg mb-8">
        <p className="text-lg">Items: {itemsCount}</p>
        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
        {cartItems.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        )}
      </div>
      
      {/* Test Products */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {testProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-xl font-bold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      {/* Cart Items */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>${item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decrementQuantity(item._id))}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item._id))}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="bg-red-500 text-white px-4 py-1 rounded ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}