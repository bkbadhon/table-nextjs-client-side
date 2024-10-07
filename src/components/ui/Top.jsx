import './active.css'
import { BsBank } from "react-icons/bs";
const Top = () => {
    return (
        <div className='w-11/12 mx-auto'> 
            <div className='flex bg-gray-200 p-2 w-[350px] gap-12'>
                <button className='active font-semibold'>
                    Bank Accounts
                </button>
                <button className='font-semibold'>
                    Cards
                </button>
                <button className='font-semibold'>
                    Statements
                </button>
            </div>

            <div className='flex my-8 justify-between gap-12'>
                <div className='flex  rounded-2xl shadow-xl w-full py-4 px-6 justify-between'>
                    <div>
                        <h2 className='my-4 text-2xl font-semibold'>City Bank</h2>
                        <p className='text-gray-500'>A/C ***********7648</p>
                        <h3 className='text-3xl font-semibold my-4'>$87867</h3>
                    </div>
                    <div>
                    <BsBank className='text-2xl my-6 rounded-full bg-[#af8cf4]  p-1'/>
                    </div>
                </div>
                <div className='flex  rounded-2xl shadow-xl w-full py-4 px-6 justify-between'>
                    <div>
                        <h2 className='my-4 text-2xl font-semibold'>City Bank</h2>
                        <p className='text-gray-500'>A/C ***********7648</p>
                        <h3 className='text-3xl font-semibold my-4'>$87867</h3>
                    </div>
                    <div>
                    <BsBank className='text-2xl my-6 rounded-full bg-[#af8cf4] p-1'/>
                    </div>
                </div>
                <div className='flex  rounded-2xl shadow-xl w-full py-4 px-6 justify-between'>
                    <div>
                        <h2 className='my-4 text-2xl font-semibold'>Yes Bank</h2>
                        <p className='text-gray-500'>A/C ***********7648</p>
                        <h3 className='text-3xl font-semibold my-4'>$87867</h3>
                    </div>
                    <div>
                    <BsBank className='text-2xl my-6 rounded-full bg-[#af8cf4]  p-1'/>
                    </div>
                </div>
                
            </div>
            <button className=' border-2 border-gray-400 text-[#7f49eb] hover:bg-[#7f49eb] hover:text-white duration-500 font-semibold p-2 w-96 '>+  Add New</button>
        </div>
    );
};

export default Top;