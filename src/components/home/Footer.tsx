import { IoMail } from 'react-icons/io5';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="md:flex md:items-center md:justify-between md:p-10 lg:px-[140px]">
      <div className="text-center text-xs text-gray-9FA6B2">©codeit - 2023</div>

      <div className="flex items-center justify-center gap-5 mt-3 mb-[68px] md:m-0 text-xs text-gray-9FA6B2">
        <span className="cursor-pointer">Privacy Policy</span>
        <span className="cursor-pointer">FAQ</span>
      </div>

      <div className="flex items-center justify-center gap-5 text-lg">
        <IoMail className="cursor-pointer" />
        <FaFacebookSquare className="cursor-pointer" />
        <FaInstagram className="cursor-pointer" />
      </div>
    </div>
  );
}
