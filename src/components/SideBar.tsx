import { BiSolidMessageRounded } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const SideBar = () => {
  const style = { fontSize: '3em', color: '#1f2937' };
  return (
    <div className="flex flex-col items-center w-14 h-screen bg-slate-200 rounded-xl ml-1 ">
      <ul className="m-auto mx-0 flex flex-col gap-9  ">
        <li className="hover:bg-gray-300 active:text-gray-900 transition duration-300 rounded-md">
          <BiSolidMessageRounded style={style} />
        </li>
        <Link
          to="/friends"
          className="hover:bg-gray-300 transition duration-300 rounded-md"
        >
          <FaUserFriends style={style} />
        </Link>
        <Link
          to="/home"
          className="hover:bg-gray-300 transition duration-300 rounded-md"
        >
          <FaUser style={style} />
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
