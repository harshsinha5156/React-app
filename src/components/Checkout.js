// // src/components/Checkout.js
// import React, { useState } from 'react';
// import { FaShoppingCart, FaCheck, FaCreditCard, FaTruck, FaCheckCircle } from 'react-icons/fa';

// const Checkout = ({ cartItems, onBackToCart, onPlaceOrder }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: 'United States',
//     phone: '',
//     email: ''
//   });
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardName: '',
//     cardNumber: '',
//     expDate: '',
//     cvv: ''
//   });
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
//   };

//   const calculateTax = () => {
//     return (calculateTotal() * 0.08).toFixed(2);
//   };

//   const calculateGrandTotal = () => {
//     return (parseFloat(calculateTotal()) + parseFloat(calculateTax()) + 5.99;
//   };

//   const handleShippingChange = (e) => {
//     setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
//   };

//   const handlePaymentChange = (e) => {
//     setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
//   };

//   const handleSubmitShipping = (e) => {
//     e.preventDefault();
//     setCurrentStep(2);
//   };

//   const handleSubmitPayment = (e) => {
//     e.preventDefault();
//     setCurrentStep(3);
//   };

//   const handlePlaceOrder = () => {
//     setOrderPlaced(true);
//     // Simulate API call
//     setTimeout(() => {
//       onPlaceOrder();
//       setCurrentStep(4);
//     }, 1500);
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <ShippingStep 
//           shippingInfo={shippingInfo} 
//           onChange={handleShippingChange} 
//           onSubmit={handleSubmitShipping} 
//           onBack={onBackToCart}
//         />;
//       case 2:
//         return <PaymentStep 
//           paymentInfo={paymentInfo} 
//           onChange={handlePaymentChange} 
//           onSubmit={handleSubmitPayment} 
//           onBack={() => setCurrentStep(1)}
//         />;
//       case 3:
//         return <ReviewStep 
//           cartItems={cartItems} 
//           shippingInfo={shippingInfo} 
//           paymentInfo={paymentInfo}
//           calculateTotal={calculateTotal}
//           calculateTax={calculateTax}
//           calculateGrandTotal={calculateGrandTotal}
//           onPlaceOrder={handlePlaceOrder}
//           onBack={() => setCurrentStep(2)}
//           orderPlaced={orderPlaced}
//         />;
//       case 4:
//         return <ConfirmationStep 
//           orderNumber="#12345" 
//           onContinueShopping={onBackToCart}
//           shippingInfo={shippingInfo}
//         />;
//       default:
//         return <div>Invalid step</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Checkout</h1>
//           <div className="flex justify-center">
//             <div className="w-full max-w-2xl">
//               <div className="flex justify-between relative">
//                 {[1, 2, 3, 4].map((step) => (
//                   <div key={step} className="flex flex-col items-center relative z-10">
//                     <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
//                       currentStep >= step 
//                         ? 'bg-indigo-600 text-white' 
//                         : 'bg-white border-2 border-indigo-600 text-indigo-600'
//                     }`}>
//                       {currentStep > step ? (
//                         <FaCheck className="text-lg" />
//                       ) : (
//                         <span className="font-bold">{step}</span>
//                       )}
//                     </div>
//                     <span className={`text-sm font-medium ${
//                       currentStep >= step ? 'text-indigo-600' : 'text-gray-500'
//                     }`}>
//                       {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : step === 3 ? 'Review' : 'Confirmation'}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="absolute top-6 left-16 right-16 h-1 bg-gray-300 z-0">
//                   <div 
//                     className="h-full bg-indigo-600 transition-all duration-500 ease-in-out" 
//                     style={{ width: `${(currentStep - 1) * 33.33}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
//           {renderStep()}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ShippingStep = ({ shippingInfo, onChange, onSubmit, onBack }) => {
//   return (
//     <div>
//       <div className="flex items-center mb-6">
//         <FaTruck className="text-indigo-600 text-2xl mr-3" />
//         <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
//       </div>
      
//       <form onSubmit={onSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={shippingInfo.firstName}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={shippingInfo.lastName}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={shippingInfo.address}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               value={shippingInfo.city}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
//             <input
//               type="text"
//               id="state"
//               name="state"
//               value={shippingInfo.state}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
//             <input
//               type="text"
//               id="zip"
//               name="zip"
//               value={shippingInfo.zip}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//             <select
//               id="country"
//               name="country"
//               value={shippingInfo.country}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             >
//               <option>United States</option>
//               <option>Canada</option>
//               <option>United Kingdom</option>
//               <option>Australia</option>
//               <option>Germany</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={shippingInfo.phone}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={shippingInfo.email}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
//         </div>
        
//         <div className="flex justify-between mt-8">
//           <button
//             type="button"
//             onClick={onBack}
//             className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//           >
//             Back to Cart
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//           >
//             Continue to Payment
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const PaymentStep = ({ paymentInfo, onChange, onSubmit, onBack }) => {
//   return (
//     <div>
//       <div className="flex items-center mb-6">
//         <FaCreditCard className="text-indigo-600 text-2xl mr-3" />
//         <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
//       </div>
      
//       <form onSubmit={onSubmit}>
//         <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
//           <div className="mb-4">
//             <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
//             <input
//               type="text"
//               id="cardName"
//               name="cardName"
//               value={paymentInfo.cardName}
//               onChange={onChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
//             <input
//               type="text"
//               id="cardNumber"
//               name="cardNumber"
//               value={paymentInfo.cardNumber}
//               onChange={onChange}
//               required
//               placeholder="0000 0000 0000 0000"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
//               <input
//                 type="text"
//                 id="expDate"
//                 name="expDate"
//                 value={paymentInfo.expDate}
//                 onChange={onChange}
//                 required
//                 placeholder="MM/YY"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//             </div>
//             <div>
//               <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 name="cvv"
//                 value={paymentInfo.cvv}
//                 onChange={onChange}
//                 required
//                 placeholder="123"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-between mt-8">
//           <button
//             type="button"
//             onClick={onBack}
//             className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//           >
//             Back to Shipping
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//           >
//             Review Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const ReviewStep = ({ 
//   cartItems, 
//   shippingInfo, 
//   paymentInfo, 
//   calculateTotal, 
//   calculateTax, 
//   calculateGrandTotal,
//   onPlaceOrder,
//   onBack,
//   orderPlaced
// }) => {
//   return (
//     <div>
//       <div className="flex items-center mb-6">
//         <FaShoppingCart className="text-indigo-600 text-2xl mr-3" />
//         <h2 className="text-2xl font-bold text-gray-800">Review Your Order</h2>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Information</h3>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-gray-700">{shippingInfo.firstName} {shippingInfo.lastName}</p>
//               <p className="text-gray-700">{shippingInfo.address}</p>
//               <p className="text-gray-700">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
//               <p className="text-gray-700">{shippingInfo.country}</p>
//               <p className="text-gray-700 mt-2">Phone: {shippingInfo.phone}</p>
//               <p className="text-gray-700">Email: {shippingInfo.email}</p>
//             </div>
//           </div>
          
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Method</h3>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-gray-700">{paymentInfo.cardName}</p>
//               <p className="text-gray-700">Card ending in ****{paymentInfo.cardNumber.slice(-4)}</p>
//               <p className="text-gray-700">Expires: {paymentInfo.expDate}</p>
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h3>
//           <div className="border border-gray-200 rounded-lg">
//             <div className="p-4 border-b border-gray-200">
//               {cartItems.map((item, index) => (
//                 <div key={index} className="flex justify-between py-2">
//                   <div className="flex items-center">
//                     <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
//                     <div className="ml-4">
//                       <p className="font-medium text-gray-800">{item.name}</p>
//                       <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
//                     </div>
//                   </div>
//                   <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                 </div>
//               ))}
//             </div>
            
//             <div className="p-4 space-y-3">
//               <div className="flex justify-between text-gray-600">
//                 <p>Subtotal</p>
//                 <p>${calculateTotal()}</p>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <p>Shipping</p>
//                 <p>$5.99</p>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <p>Tax</p>
//                 <p>${calculateTax()}</p>
//               </div>
//               <div className="flex justify-between font-bold text-lg text-gray-800 pt-3 border-t border-gray-200">
//                 <p>Total</p>
//                 <p>${calculateGrandTotal()}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex justify-between mt-8">
//         <button
//           onClick={onBack}
//           className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//         >
//           Back to Payment
//         </button>
//         <button
//           onClick={onPlaceOrder}
//           disabled={orderPlaced}
//           className={`px-6 py-3 rounded-lg font-medium flex items-center ${
//             orderPlaced 
//               ? 'bg-gray-400 cursor-not-allowed' 
//               : 'bg-indigo-600 text-white hover:bg-indigo-700'
//           }`}
//         >
//           {orderPlaced ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Processing...
//             </>
//           ) : (
//             <>
//               <FaCheck className="mr-2" />
//               Place Order
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const ConfirmationStep = ({ orderNumber, onContinueShopping, shippingInfo }) => {
//   return (
//     <div className="text-center py-8">
//       <div className="flex justify-center mb-6">
//         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//           <FaCheckCircle className="text-green-500 text-4xl" />
//         </div>
//       </div>
      
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
//       <p className="text-gray-600 mb-8 max-w-md mx-auto">
//         Thank you for your order. Your order number is <span className="font-semibold">{orderNumber}</span>. 
//         We've sent a confirmation email with your order details.
//       </p>
      
//       <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
//         <h3 className="font-semibold text-green-800 mb-3">Estimated Delivery</h3>
//         <p className="text-green-700">Monday, July 15 - Wednesday, July 17</p>
//         <p className="text-green-700 text-sm mt-2">
//           Shipping to: {shippingInfo.city}, {shippingInfo.state}
//         </p>
//       </div>
      
//       <button
//         onClick={onContinueShopping}
//         className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//       >
//         Continue Shopping
//       </button>
//     </div>
//   );
// };

// export default Checkout;