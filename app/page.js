'use client';
import React, { useState, useEffect } from 'react';
import Postgrid from '@/components/Postgrid';
import { getPosts } from '@/actions/wp.actions';

const Page = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // console.log("Page: " + page);
  // console.log(posts);

  const allPosts = async () => {
    setLoading(true);
    const res = await getPosts(page);

    setPosts(res.posts);
    setTotalPages(res.totalPages)
    setLoading(false);
  }

  useEffect(() => {
    allPosts();
  }, [page])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
    console.log(page + " " + totalPages)
  };

  const handlePreviousPage = () => {
    if(page > 1){
      setPage(page - 1);
    }
  }

  const handleLastPage = () => {
    setPage(totalPages);
  }

  const handlePage = (pageNumber) => {
    setPage(pageNumber)
  }

  return (
    <>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-md mx-auto md:mx-0">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Read latest collection
            </h2>
            <p className="mt-5 text-base font-normal leading-7 text-gray-500">
              Create custom landing pages with Rareblocks that converts more
              visitors than any website.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
            { loading ? (<p>Loading...</p>) : posts.length ? (posts.map((post) => (
              <Postgrid key={post.id} post={post} />
            ))): <p>No posts found</p>}
            
          </div>
        </div>
      </section>

      

      <div className="py-12 bg-white sm:py-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center space-x-2">
            <button
              href="#"
              className="inline-flex items-center justify-center text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md w-9 h-9 hover:bg-gray-50"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pages = index + 1;
              const isActive = pages === page;

              return (
                <a
                  key={pages}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pages);
                  }}
                  className={`inline-flex items-center justify-center text-base font-semibold transition-all duration-200 border rounded-md sm:text-sm w-9 h-9 ${
                    isActive
                      ? "text-white bg-gray-900 border-gray-900"
                      : "text-gray-600 bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pages}
                </a>
              );
            })}

            <button
              href="#"
              className="inline-flex items-center justify-center text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md w-9 h-9 hover:bg-gray-50"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <a
              href="#"
              className="inline-flex items-center justify-center text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md w-9 h-9 hover:bg-gray-50"
              onClick={handleLastPage}
              disabled={page === totalPages}
            >
              <span className="sr-only">Last</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div> 
    </>
  );
};

export default Page;