"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";

function Home() {
  const [peopleData, setPeopleData] = useState([]);
  const [currUserData, setCurrUserData] = useState();
  const [clicked, setClicked] = useState(false);
  const [noDataFetched, setNoDataFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  const doFetching = async () => {
    try {
      let data = await fetch(
        "https://randomuser.me/api/?page=1&results=1&seed=abc"
      );
      data = await data.json();
      console.log(data);
      setPeopleData(data?.results);
      setLoading(false);
    } catch (error) {
      setNoDataFetched(true);
      throw error;
    }
  };
  useEffect(() => {
    doFetching();
  }, []);

  return (
    <main>
      {noDataFetched ? (
        <div className="flex justify-center items-center">
          <h1 className="font-semibold text-3xl mt-4">No Data to Show</h1>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <RingLoader color="#36d7b7" size={150} />
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-semibold mt-8 ml-8 text-white lg:text-center">Users</h1>
          <div className={`flex ${!clicked ? "justify-center" : ""}`}>
            <div className={`${clicked ? "md:w-1/2 w-full" : "w-[50%]"} `}>
              {peopleData &&
                peopleData?.length > 0 &&
                peopleData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="m-4 border p-4 hover:bg-green-300 cursor-pointer rounded-lg bg-gray-200"
                      onClick={() => {
                        setCurrUserData(item);
                        setClicked(true);
                      }}
                    >
                      <div className="flex gap-2 justify-centre items-center">
                        <Image
                          height={200}
                          width={200}
                          src={item?.picture?.large}
                          alt={`${item?.picture?.large}-pic`}
                        />
                        <div>
                          <div className="flex gap-2">
                            <p className="font-semibold text-[36px]">
                              {item?.name?.first}
                            </p>
                            <p className="font-semibold text-[36px]">
                              {item?.name?.last}
                            </p>
                          </div>
                          <h2 className="font-semibold text-[36px]">
                            {item?.gender?.toUpperCase()?.charAt(0) +
                              item?.gender?.slice(1)}
                          </h2>
                          <h2 className="font-semibold text-[36px]">
                            {item?.phone}
                          </h2>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div
              className={`${
                clicked
                  ? "md:w-1/2 fixed top-2 left-2 right-2 md:left-auto md:right-2 md:top-16 border p-4 rounded-lg shadow-lg"
                  : "w-0"
              } bg-white`}
            >
              {clicked && (
                <div className="relative">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      height={100}
                      width={100}
                      src={currUserData?.picture?.large}
                      alt={`${currUserData?.name?.first}-pic`}
                      className="rounded-full"
                    />
                    <h1 className="font-semibold">
                      {currUserData?.name?.first}
                    </h1>
                  </div>

                  <div
                    onClick={() => setClicked(false)}
                    className="absolute top-0 right-0 cursor-pointer"
                  >
                    <CloseIcon style={{ width: "40px", height: "40px" }} />
                  </div>

                  <div className="flex flex-col justify-start items-start">
                    <p className="text-gray-900 font-semibold">
                      First Name:{" "}
                      <span className="text-gray-700">
                        {currUserData?.name?.first}{" "}
                      </span>
                    </p>
                    <p className="text-gray-900 font-semibold">
                      Last Name:{" "}
                      <span className="text-gray-700">
                        {currUserData?.name?.last}
                      </span>
                    </p>
                    <p className="text-gray-900 font-semibold">
                      Gender:{" "}
                      <span className="text-gray-700">
                        {currUserData?.gender?.toUpperCase()?.charAt(0) +
                          currUserData?.gender?.slice(1)}
                      </span>
                    </p>
                    <p className="text-gray-900 font-semibold">
                      Phone Number:{" "}
                      <span className="text-gray-700">
                        {currUserData?.phone}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
