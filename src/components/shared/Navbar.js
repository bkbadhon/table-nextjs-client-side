import img from '@/assets/avatar1.jpg'
import Image from 'next/image';
import { FaRegBell } from "react-icons/fa6";
const Navbar = () => {
    return (
        <div className="navbar w-11/12 mx-auto bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Banking</a>
            </div>

            <div className=" navbar-end flex gap-7 ">
                <div>
                    <h2 className='border-1 border-black p-1'>Ai Categorisation</h2>
                </div>
                <div>
                <FaRegBell />
                </div>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <Image
                            src={img}
                            height={20}
                            width={20}
                            alt="Avatar" />
                    </div>
                   
                </div>
            </div>
        </div >
    );
};

export default Navbar;