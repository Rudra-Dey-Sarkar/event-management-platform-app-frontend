"use client"
import React, { useState, useEffect, useContext } from 'react'
import LogReg from '../LogReg/LogReg'
import { GlobalContext } from '../../GlobalContext/GlobalContext';

function Main() {
  const { isActive, setIsActive }: any = useContext(GlobalContext);

  return (
    <div className="grid w-full h-[100vh] justify-center items-center">
      <div className="grid justify-center items-center gap-y-5 w-fit h-fit border-4 border-gray-600 p-5 rounded-[10px]">
        <div className='flex gap-x-3 items-center'>
          <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 452.986 452.986"
            xmlSpace="preserve"
            width="56px"
            height="56px">
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
            <p className='w-fit h-fit leading-none font-bold text-[2.5rem]'>EMPA</p>
            <p className="w-fit h-fit leading-none text-center font-semibold">Event Management Platform App</p>
          </div>
        </div>
        <div className='grid justify-center items-center gap-y-5 w-fit h-fit m-auto bg-gray-100 p-5 '>
          <p className='w-fit text-[1.2rem] font-bold text-black'>Please Login or Register</p>
          <button
            onClick={() => setIsActive(true)}
            className='border-2 border-[#35793729] w-fit h-fit m-auto py-1 px-4 rounded-[10px] shadow-[0px_0px_5px_5px_gray] font-semibold hover:scale-105 text-black'>Login/Register</button>

          {isActive === true &&
            <div
              className='fixed inset-0 flex justify-center items-center bg-black text-black bg-opacity-50 z-50'
              onClick={() => setIsActive(false)}>
              <div
                className='bg-white p-5 rounded-md shadow-lg'
                onClick={(e) => e.stopPropagation()}>
                <LogReg />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Main