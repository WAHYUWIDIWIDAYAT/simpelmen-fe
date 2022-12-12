// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { HiOutlineArrowSmLeft } from 'react-icons/hi';
// import FormKarton from './components/FormKarton';
// import Alerts from '../../components/Alerts';
// import FormDus from './components/FormDus';
// import FormSablon from './components/FormSablon';
// import FormSticker from './components/FormSticker';
// import FormStandingPouch from './components/FormStandingPouch';
// import useProductDetail from '../../hooks/useProductDetail';
// import SkeletonImage from '../../components/Skeletons/SkeletonImage';
// import FormSkeleton from '../../components/Skeletons/FormSkeleton';
// import Zoom from 'react-img-zoom';

// const DetailProduct = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState();
//   const [alertSuccess, setAlertSuccess] = useState(false);
//   const [alertFail, setAlertFail] = useState(false);
//   const { data, isLoading } = useProductDetail(
//     `https://simpelmen.herokuapp.com/api/product/${productId}`
//   );
//   const user = localStorage.getItem('user');

//   // Set Dynamic Form
//   useEffect(() => {
//     switch (data?.product_category) {
//       case 'K':
//         return setForm(
//           <FormKarton
//             productId={productId}
//             setAlertSuccess={setAlertSuccess}
//             setAlertFail={setAlertFail}
//           />
//         );
//       case 2:
//         return setForm(
//           <FormDus
//             categoryName="Slobokan"
//             setAlertSuccess={setAlertSuccess}
//             setAlertFail={setAlertFail}
//           />
//         );
//       case 'S':
//         return setForm(
//           <FormSablon
//             productId={productId}
//             setAlertSuccess={setAlertSuccess}
//             setAlertFail={setAlertFail}
//           />
//         );
//       case 4:
//         return setForm(
//           <FormSticker
//             setAlertSuccess={setAlertSuccess}
//             setAlertFail={setAlertFail}
//           />
//         );
//       case 'O':
//         // standing pouch, dus offset, stiker
//         return setForm(
//           <FormStandingPouch
//             productId={productId}
//             setAlertSuccess={setAlertSuccess}
//             setAlertFail={setAlertFail}
//           />
//         );
//       default:
//         break;
//     }
//   }, [data, productId]);

//   useEffect(() => {
//     setTimeout(() => {
//       if (alertSuccess || alertFail === true)
//         setAlertFail(false) || setAlertSuccess(false);
//     }, 2000);
//   }, [alertFail, alertSuccess]);

//   return (
//     <>
//       <main>
//         {alertSuccess && (
//           <Alerts
//             background="bg-green-100"
//             textColor="text-green-600"
//             textContent="Pemesanan Berhasil"
//             state="true"
//           />
//         )}
//         {alertFail && (
//           <Alerts
//             background="bg-red-100"
//             textColor="text-red-600"
//             textContent={`${
//               user
//                 ? 'Mohon masukkan data produk dengan benar'
//                 : 'Login Terlebih Dahulu'
//             }`}
//             state="true"
//           />
//         )}
//         <section className="containers">
//           <div className="mb-5 mt-0 xs:mt-7 flex">
//             <div
//               className="flex items-center mb-3 cursor-pointer"
//               onClick={() => navigate(-1)}
//             >
//               <HiOutlineArrowSmLeft className="text-2xl mr-3" />
//               <span className="leading-10">Kembali</span>
//             </div>
//           </div>
//           <div className="grid grid-systems gap-8 ">
//             <div className="col-span-4 2xsm:col-span-8 2md:col-span-6">
//               <div
//                 className={`border rounded-xl mb-5 border-secondary-800/50 ${
//                   !isLoading ? 'p-6' : ''
//                 }`}
//               >
//                 <div
//                   className={`w-full overflow-auto rounded-xl ${
//                     !isLoading ? 'flex justify-center items-center' : ''
//                   }`}
//                 >
//                   <div>
//                     {isLoading ? (
//                       <SkeletonImage />
//                     ) : (
//                       <Zoom
//                         img={`data:image/jpg;base64,${data?.product_image}`}
//                         zoomScale={2}
//                         height={window.innerWidth < 576 ? 227 : 360}
//                         width={window.innerWidth < 576 ? 340 : 540}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//               {isLoading ? (
//                 <>
//                   <div className="animate-pulse">
//                     <div className="h-8 w-1/3 bg-slate-200 rounded"></div>
//                     <div className="h-8 w-1/2 bg-slate-200 rounded mt-3"></div>
//                     <div className="h-24 w-full bg-slate-200 rounded mt-3"></div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-3xl">
//                     {/* Bahan:{" "} */}
//                     <span>{data?.product_name}</span>
//                   </p>
//                   <h2 className="text-orange-900 mb-2">
//                     {data?.jenis_products.jenis_product_name}
//                   </h2>
//                   <p>{data?.product_description}</p>
//                 </>
//               )}
//             </div>
//             <div className="col-span-4 2xsm:col-span-8 2md:col-span-6">
//               {isLoading ? (
//                 <FormSkeleton />
//               ) : (
//                 <div className="form-content 2md:px-10">{form}</div>
//               )}
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default DetailProduct;
