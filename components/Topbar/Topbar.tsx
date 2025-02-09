import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../GlobalContext/GlobalContext'
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

function ControlActive(isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) {
  if (isActive === false) {
    setIsActive(true);
  } else {
    setIsActive(false);
  }
}


function Topbar() {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isPresent, setIsPresent }: any = useContext(GlobalContext);


  return (
    <div className='flex justify-between items-center px-2 py-2 border-b-2 border-gray-600'>

      <div className='flex gap-x-3 items-center'>
        <svg
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 452.986 452.986"
          xmlSpace="preserve"
          width="36px"
          height="36px">
          <g>
            <g>
              <g>
                <path
                  style={{
                    fill: "#010002",
                  }}
                  d="M404.344,0H48.642C21.894,0,0,21.873,0,48.664v355.681c0,26.726,21.894,48.642,48.642,48.642 h355.702c26.726,0,48.642-21.916,48.642-48.642V48.664C452.986,21.873,431.07,0,404.344,0z M148.429,33.629h156.043v40.337 H148.429V33.629z M410.902,406.372H42.041v-293.88h368.86V406.372z"
                />
                <rect
                  x={79.273}
                  y={246.23}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.642}
                  height={48.664}
                />
                <rect
                  x={79.273}
                  y={323.26}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.642}
                  height={48.642}
                />
                <rect
                  x={160.853}
                  y={169.223}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.621}
                  height={48.642}
                />
                <rect
                  x={160.853}
                  y={246.23}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.621}
                  height={48.664}
                />
                <rect
                  x={160.853}
                  y={323.26}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.621}
                  height={48.642}
                />
                <rect
                  x={242.369}
                  y={169.223}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.664}
                  height={48.642}
                />
                <rect
                  x={242.369}
                  y={246.23}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.664}
                  height={48.664}
                />
                <rect
                  x={242.369}
                  y={323.26}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.664}
                  height={48.642}
                />
                <rect
                  x={323.907}
                  y={169.223}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.664}
                  height={48.642}
                />
                <rect
                  x={323.907}
                  y={246.23}
                  style={{
                    fill: "#010002",
                  }}
                  width={48.664}
                  height={48.664}
                />
              </g>
            </g>
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
            <g />
          </g>
        </svg>
        <div>
          <p className='w-fit h-fit leading-none font-bold text-[1.4rem]'>EMPA</p>
          <p className="w-fit h-fit leading-none text-center font-semibold">Event Management Platform App</p>
        </div>
      </div>

      <div
        className='border-4 border-gray-500 p-1 rounded-full relative hover:cursor-pointer'
        onClick={() => ControlActive(isActive, setIsActive)}>
        <svg
          height="25px"
          width="25px"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 60.671 60.671"
          xmlSpace="preserve">
          <g>
            <g>
              <ellipse
                style={{
                  fill: "#010002",
                }}
                cx={30.336}
                cy={12.097}
                rx={11.997}
                ry={12.097}
              />
              <path
                style={{
                  fill: "#010002",
                }}
                d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"
              />
            </g>
          </g>
        </svg>

        {isActive === true &&
          <div className='grid gap-y-2 absolute right-0 top-10 bg-white w-[100px] px-2 py-2 border-2 border-gray-500'>
            <button 
            className='font-semibold w-full px-1 py-1  hover:bg-gray-200'
            onClick={() => {
            router.push("/profile");
            }}>Profile</button>
            <button
              className='font-semibold w-full px-1 py-1 hover:bg-gray-200'
              onClick={() => {
                deleteCookie("user");
                setIsPresent(false);
              }}>Logout</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Topbar