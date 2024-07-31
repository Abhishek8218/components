import React, { useState } from 'react';

interface CartCounterProps {
    maxValue?: number;
    minValue?: number;
}

interface Error {
    type: string;
    message: string;
}

const CartCounter = ({ maxValue = 10, minValue = 0 }: CartCounterProps) => {
    const [quantity, setQuantity] = useState(minValue);
    const [error, setError] = useState<Error | null>(null);

    const handleDecrease = () => {
        if (quantity > minValue) {
            setQuantity(prev => Math.max(prev - 1, minValue));
            setError(null); // Clear error on successful action
        } else {
            setError({
                type: 'decrease',
                message: `Quantity cannot be less than ${minValue}.`,
            });
            console.log("Error: ",error?.message);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxValue) {
            setQuantity(prev => Math.min(prev + 1, maxValue));
            setError(null); // Clear error on successful action
        } else {
            setError({
                type: 'increase',
                message: `Quantity cannot exceed ${maxValue}.`
            });
            console.log("Error: ",error?.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
        return;
        } else if (value < minValue) {
            setQuantity(minValue);
            setError({
                type: 'input',
                message: `Value cannot be less than ${minValue}.`
            });
        } else if (value > maxValue) {
            setQuantity(maxValue);
            setError({
                type: 'input',
                message: `Value cannot exceed ${maxValue}.`
            });
        } else {
            setQuantity(value);
            setError(null); // Clear error on valid input
        }
    };

    return (
        <div className="flex flex-col items-center border-2 border-blue-500 rounded shadow-sm p-2">
            <div className="flex items-center mb-1">
                <button 
                    className="bg-blue-500 rounded-md text-white border-none cursor-pointer text-xl w-8 h-auto text-center transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    aria-label="Decrease" 
                    onClick={handleDecrease} 
                    disabled={quantity <= minValue}
                >
                    -
                </button>
                <input
                    type="number"
                    className="w-[4em] text-center border-none py-0 px-0 text-lg outline-none text-black"
                  
                    value={quantity}
                    onChange={handleChange}
                    min={minValue}
                    max={maxValue}
                    step={1}
                />
                <button 
                    className="bg-blue-500 rounded-md text-white border-none cursor-pointer text-xl w-8 h-auto text-center transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    aria-label="Increase" 
                    onClick={handleIncrease} 
                    disabled={quantity >= maxValue}
                >
                    +
                </button>
            </div>
            {error && (
                <div className="text-red-500 mt-2">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default CartCounter;
