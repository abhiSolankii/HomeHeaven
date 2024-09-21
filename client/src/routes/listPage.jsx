import React from "react";
import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const ListPage = () => {
  const data = useLoaderData();
  // console.log(data);
  return (
    <div className="md:flex w-full mt-6">
      {/* list container  */}
      <div className=" md:w-4/6 p-2 md:p-4 overflow-y-scroll">
        <div className="mb-4">
          <Filter />
        </div>
        <div className="mt-6 flex flex-col gap-4 md:p-2  ">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.posts.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      {/* map container  */}
      <div className=" md:w-2/6 w-full h-full">
        <h1 className="font-semibold text-xl p-4 font-serif ">Map</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data.posts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
