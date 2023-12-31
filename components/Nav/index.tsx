import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

const NavBar = () => (
  <header className='w-full bg-blue-400'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4 bg-transparent'>
      <Link href='/' className='flex justify-center items-center m-r-20'>
        <Image
          src='/flow.png'
          alt='logo'
          width={118}
          height={18}
          className='object-contain'
        />
      </Link>

      <CustomButton
        title='See More'
        btnType='button'
        containerStyles='rounded-full bg-white min-w-[130px]'
      />
    </nav>
  </header>
);

export default NavBar;