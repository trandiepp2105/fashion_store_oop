import React, { useEffect } from "react";
import "./NavBar.scss";
import "../../styles/_variables.scss";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
const NavBar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <div className="nav-bar">
      <div className="header">
        <div className="wrapper-logo"></div>
        <p className="brand-name">Fashion Store</p>
      </div>
      {/* <SearchBar /> */}
      <ul className="navigations">
        <Link
          className={`navigation-link ${
            location.pathname === "/" ? "active" : ""
          }`}
          to="/"
        >
          <svg
            fill="#58606a"
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="dashboard"
            class="icon glyph"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <rect x="2" y="2" width="9" height="11" rx="2" />

              <rect x="13" y="2" width="9" height="7" rx="2" />

              <rect x="2" y="15" width="9" height="7" rx="2" />

              <rect x="13" y="11" width="9" height="11" rx="2" />
            </g>
          </svg>
          Dashboard
        </Link>
        <Link
          className={`navigation-link ${
            location.pathname.includes("products") ? "active" : ""
          }`}
          to="/products"
        >
          <svg
            fill="#58606a"
            width="18px"
            height="18px"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path d="m24 35.33a.81.81 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.32 2.44h-16.42a2.45 2.45 0 0 1 -2.44-2.28v-11.57a.81.81 0 0 1 .71-.81h19.66zm23.61 0a.82.82 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.33 2.44h-16.42a2.44 2.44 0 0 1 -2.43-2.28v-11.57a.81.81 0 0 1 .71-.81h19.61zm-29.92 3.37-.09.07-4.6 5.06-2.11-2a.62.62 0 0 0 -.79-.07l-.08.07-.87.78a.49.49 0 0 0 -.07.71l.07.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.15 1.15 0 0 0 .87-.36l5.52-5.84a.63.63 0 0 0 .06-.72l-.06-.07-.87-.78a.61.61 0 0 0 -.85-.12zm23.61 0-.09.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.49.49 0 0 0 -.06.71l.06.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.14 1.14 0 0 0 .87-.36l5.56-5.89a.65.65 0 0 0 0-.72v-.07l-.87-.78a.61.61 0 0 0 -.83-.07zm-18.76-11.52a2.36 2.36 0 0 1 2.27 2.28v2.61a.81.81 0 0 1 -.66.81h-21.39a.78.78 0 0 1 -.76-.7v-2.55a2.38 2.38 0 0 1 2.13-2.44h18.41zm25.18 0a2.36 2.36 0 0 1 2.28 2.28v2.61a.81.81 0 0 1 -.66.81h-21.4a.78.78 0 0 1 -.75-.71v-2.54a2.38 2.38 0 0 1 2.13-2.44h18.4zm-12-17a.81.81 0 0 1 .8.71v11.48a2.44 2.44 0 0 1 -2.28 2.44h-16.37a2.46 2.46 0 0 1 -2.44-2.29v-11.52a.81.81 0 0 1 .71-.8h19.62zm-6.27 3.37-.08.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.5.5 0 0 0 -.07.71l.07.08 3 2.82a1.22 1.22 0 0 0 .87.37 1.13 1.13 0 0 0 .87-.37l5.53-5.83a.65.65 0 0 0 .05-.72l-.05-.07-.87-.78a.62.62 0 0 0 -.77-.15zm6.31-11.55a2.44 2.44 0 0 1 2.43 2.28v2.61a.83.83 0 0 1 -.71.81h-22.86a.81.81 0 0 1 -.81-.7v-2.56a2.44 2.44 0 0 1 2.27-2.44z" />
            </g>
          </svg>
          Products
        </Link>
        <Link
          className={`navigation-link ${
            location.pathname.includes("categories") ? "active" : ""
          }`}
          to="/categories"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                stroke="#58606a"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                stroke="#58606a"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                stroke="#58606a"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                stroke="#58606a"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
            </g>
          </svg>
          Categories
        </Link>
        <Link
          className={`navigation-link ${
            location.pathname.includes("orders") ? "active" : ""
          }`}
          to="/orders"
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 -2 1028 1028"
            fill="#58606a"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M91.448447 896c-50.086957 0-91.428571-40.546584-91.428571-91.428571V91.428571C0.019876 41.341615 40.56646 0 91.448447 0h671.006211c50.086957 0 91.428571 40.546584 91.428572 91.428571v337.093168l-3.180124-0.795031c-13.515528-3.975155-26.236025-5.565217-40.546584-5.565217h-0.795031l-0.795031-2.385093h-2.385094V91.428571c0-23.055901-20.670807-43.726708-43.726708-43.726708H91.448447c-23.055901 0-43.726708 20.670807-43.726708 43.726708v713.142858c0 23.055901 20.670807 43.726708 43.726708 43.726708h352.198758l0.795031 0.795031c8.745342 11.925466 3.975155 20.670807 0.795031 27.031056-3.180124 5.565217-4.770186 9.540373 0.795031 15.10559l4.770186 4.770186H91.448447z"
                fill=""
              />

              <path
                d="M143.125466 174.906832c-8.745342 0-15.900621-11.130435-15.900621-24.645962 0-13.515528 7.15528-24.645963 15.900621-24.645963h270.310559c8.745342 0 15.900621 11.130435 15.900621 24.645963 0 13.515528-7.15528 24.645963-15.900621 24.645962h-270.310559z"
                fill=""
              />

              <path
                d="M413.436025 128h-270.310559c-7.15528 0-13.515528 9.540373-13.515528 22.26087s6.360248 22.26087 13.515528 22.260869h270.310559c7.15528 0 13.515528-9.540373 13.515528-22.260869s-5.565217-22.26087-13.515528-22.26087zM139.945342 302.111801c-7.15528 0-12.720497-10.335404-12.720497-24.645962s5.565217-24.645963 12.720497-24.645963h193.987577c7.15528 0 12.720497 10.335404 12.720497 24.645963s-5.565217 24.645963-12.720497 24.645962H139.945342z"
                fill=""
              />

              <path
                d="M333.932919 255.204969H139.945342c-5.565217 0-9.540373 9.540373-9.540373 22.26087s3.975155 22.26087 9.540373 22.260869h193.987577c5.565217 0 9.540373-9.540373 9.540373-22.260869s-4.770186-22.26087-9.540373-22.26087zM734.628571 1024c-27.826087 0-58.037267-1.590062-96.993788-4.770186-56.447205-4.770186-108.124224-31.006211-158.211181-79.503106L253.634783 718.708075c-52.47205-50.881988-54.857143-117.664596-7.950311-168.546584 19.875776-20.670807 50.881988-33.391304 84.273292-33.391305 33.391304 0 63.602484 12.720497 82.68323 34.981367 0.795031 0.795031 2.385093 2.385093 5.565217 3.975155 0.795031 0.795031 2.385093 1.590062 3.180124 2.385093V451.57764v-52.47205c0-40.546584 0-81.888199 0.795031-122.434783 0.795031-60.42236 47.701863-106.534161 109.714286-106.534161h0.795031c59.627329 0 104.944099 43.726708 108.124224 103.354037 0.795031 13.515528 0.795031 27.826087 0 42.136646v18.285714h11.925466c41.341615 0 73.142857 14.310559 96.198757 44.52174 0.795031 1.590062 5.565217 3.180124 11.925466 3.180124 2.385093 0 4.770186 0 6.360249-0.795031 7.15528-0.795031 14.310559-1.590062 20.670807-1.590062 31.801242 0 59.627329 12.720497 83.478261 38.956521 3.975155 3.975155 12.720497 7.15528 20.670807 7.15528h3.180125c5.565217-0.795031 11.925466-1.590062 17.490683-1.590062 59.627329 0 107.329193 42.136646 108.124224 96.993789 2.385093 100.968944 3.975155 200.347826-7.15528 298.931677-13.515528 119.254658-77.118012 182.857143-201.142857 198.757764-23.055901 3.975155-49.291925 5.565217-77.913044 5.565217zM325.982609 562.086957c-16.695652 0-32.596273 6.360248-44.521739 17.490683-14.310559 14.310559-22.26087 31.006211-22.26087 49.291925 0 19.080745 8.745342 38.161491 24.645963 54.062112l30.21118 30.21118c65.987578 65.192547 134.360248 131.975155 202.732919 197.962733 33.391304 31.801242 71.552795 52.47205 113.689441 60.42236 32.596273 6.360248 65.192547 9.540373 96.993789 9.540373 28.621118 0 57.242236-2.385093 85.068323-7.950311 100.968944-18.285714 147.080745-66.782609 156.621118-160.596273 8.745342-89.838509 7.950311-182.062112 6.360248-271.10559v-14.310559c-0.795031-32.596273-23.850932-54.857143-56.447205-54.857143-8.745342 0-16.695652 1.590062-25.440993 4.770187V601.043478c0 11.130435 0 32.596273-22.26087 32.596274h-0.795031c-7.15528 0-12.720497-1.590062-15.900621-5.565218-6.360248-6.360248-7.15528-18.285714-7.15528-27.826087v-4.770186c0-36.571429 0.795031-73.937888 0-111.304348-0.795031-32.596273-23.850932-55.652174-55.652174-55.652174-7.950311 0-15.900621 1.590062-23.0559 3.975155v128.795031c0 11.130435-2.385093 19.875776-7.950311 25.440994-3.975155 3.975155-9.540373 6.360248-16.695652 6.360249h-0.795031c-21.465839-0.795031-21.465839-23.055901-21.465838-31.006211v-52.47205-66.782609c0-15.10559-6.360248-31.006211-18.285715-42.931677-11.130435-11.130435-26.236025-17.490683-41.341615-17.490683-6.360248 0-13.515528 0.795031-19.875776 3.180124V442.832298c0 27.031056 0 55.652174-1.590062 83.478261-0.795031 7.15528-7.15528 12.720497-13.515528 18.285714-2.385093 2.385093-5.565217 4.770186-7.950311 7.15528l-2.385093 2.385093-1.590062-3.975155c-1.590062-2.385093-3.975155-4.770186-6.360248-6.360249-4.770186-5.565217-10.335404-11.130435-13.515528-17.490683-2.385093-4.770186-1.590062-10.335404-1.590062-15.10559v-6.360249-69.167701c0-50.881988 0-103.354037-0.795032-155.031056 0-38.161491-24.645963-63.602484-60.42236-64.397516-38.956522 0-65.192547 27.826087-65.192546 68.372671v374.459627l-10.335404 6.360249-0.795031-1.590062c-7.15528-7.950311-15.10559-15.900621-22.26087-23.850932-16.695652-17.490683-34.186335-36.571429-51.677018-54.062112-15.900621-15.10559-35.776398-23.850932-56.447205-23.850931z"
                fill=""
              />
            </g>
          </svg>
          Orders
        </Link>
        <Link
          className={`navigation-link ${
            location.pathname.includes("users") ? "active" : ""
          }`}
          to="/users"
        >
          <svg
            fill="#58606a"
            // xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 100 100"
            enable-background="new 0 0 100 100"
            // xml:space="preserve"
            // style={{ transform: `translateX(-4px)` }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <ellipse cx="41.3" cy="42.3" rx="12.2" ry="13.5" />{" "}
              <path d="M52.6,57.4c-3.1,2.8-7,4.5-11.3,4.5c-4.3,0-8.3-1.7-11.3-4.6c-5.5,2.5-11,5.7-11,10.7v2.1 c0,2.5,2,4.5,4.5,4.5h35.7c2.5,0,4.5-2,4.5-4.5v-2.1C63.6,63,58.2,59.9,52.6,57.4z" />{" "}
              <path d="M68,47.4c-0.2-0.1-0.3-0.2-0.5-0.3c-0.4-0.2-0.9-0.2-1.3,0.1c-2.1,1.3-4.6,2.1-7.2,2.1c-0.3,0-0.7,0-1,0 c-0.5,1.3-1,2.6-1.7,3.7c0.4,0.2,0.9,0.3,1.4,0.6c5.7,2.5,9.7,5.6,12.5,9.8H75c2.2,0,4-1.8,4-4v-1.9C79,52.6,73.3,49.6,68,47.4z" />{" "}
              <path d="M66.9,34.2c0-4.9-3.6-8.9-7.9-8.9c-2.2,0-4.1,1-5.6,2.5c3.5,3.6,5.7,8.7,5.7,14.4c0,0.3,0,0.5,0,0.8 C63.4,43,66.9,39.1,66.9,34.2z" />{" "}
            </g>
          </svg>
          Users
        </Link>
        <Link
          className={`navigation-link ${
            location.pathname.includes("sales") ? "active" : ""
          }`}
          to="/sales"
        >
          <svg
            fill="#58606a"
            version="1.1"
            id="Layer_1"
            // xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            width="18px"
            height="18px"
            viewBox="0 0 72 72"
            enable-background="new 0 0 72 72"
            // xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M66.318,7.585c-0.045-0.905-0.705-1.675-1.601-1.856c-0.077-0.015-0.153-0.026-0.229-0.033L38.635,3.139 c-0.601-0.06-1.187,0.152-1.611,0.576L6.55,34.191c-4.571,4.571-4.571,7.359,0,11.929l19.338,19.34 c2.049,2.05,3.847,3.412,5.965,3.412s3.916-1.366,5.961-3.413l30.479-30.478c0.424-0.423,0.635-1.014,0.576-1.611L66.318,7.585z M34.987,62.631c-0.961,0.961-2.332,2.24-3.134,2.24c-0.803,0-2.175-1.279-3.137-2.24L9.378,43.291 c-2.989-2.988-2.989-3.283,0-6.271L39.186,7.212l23.303,2.306l2.308,23.304L34.987,62.631z" />{" "}
                <path d="M24.043,27.496l-9.09,9.089c-2.295,2.295-2.925,3.851-0.297,6.479c0.195,0.195,0.451,0.293,0.707,0.293 c0.256,0,0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.022,0-1.414c-1.567-1.567-1.548-1.805,0.297-3.651l9.09-9.089 c0.391-0.391,0.391-1.023,0-1.414S24.434,27.105,24.043,27.496z" />{" "}
                <path d="M26.888,24.649l-0.813,0.814c-0.39,0.391-0.39,1.024,0.002,1.414c0.195,0.194,0.45,0.292,0.706,0.292 c0.256,0,0.512-0.097,0.708-0.294l0.813-0.814c0.39-0.391,0.39-1.024-0.002-1.414C27.911,24.258,27.279,24.256,26.888,24.649z" />{" "}
                <path d="M50.604,12.862c-4.571,0-8.293,3.72-8.293,8.292c0,4.572,3.722,8.292,8.293,8.292c4.573,0,8.291-3.72,8.291-8.292 C58.895,16.582,55.176,12.862,50.604,12.862z M50.604,25.446c-2.367,0-4.293-1.926-4.293-4.292c0-2.366,1.926-4.292,4.293-4.292 c2.369,0,4.291,1.926,4.291,4.292C54.895,23.52,52.971,25.446,50.604,25.446z" />{" "}
              </g>{" "}
            </g>
          </svg>
          Sales
        </Link>
        <Link
          className={`navigation-link ${
            location.pathname.includes("coupons") ? "active" : ""
          }`}
          to="/coupons"
        >
          <svg
            width="23px"
            height="23px"
            viewBox="0 0 24 24"
            fill="#58606a"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.75 6.75L4.5 6H20.25L21 6.75V10.7812H20.25C19.5769 10.7812 19.0312 11.3269 19.0312 12C19.0312 12.6731 19.5769 13.2188 20.25 13.2188H21V17.25L20.25 18L4.5 18L3.75 17.25V13.2188H4.5C5.1731 13.2188 5.71875 12.6731 5.71875 12C5.71875 11.3269 5.1731 10.7812 4.5 10.7812H3.75V6.75ZM5.25 7.5V9.38602C6.38677 9.71157 7.21875 10.7586 7.21875 12C7.21875 13.2414 6.38677 14.2884 5.25 14.614V16.5L9 16.5L9 7.5H5.25ZM10.5 7.5V16.5L19.5 16.5V14.614C18.3632 14.2884 17.5312 13.2414 17.5312 12C17.5312 10.7586 18.3632 9.71157 19.5 9.38602V7.5H10.5Z"
                fill="#58606a"
              />{" "}
            </g>
          </svg>
          Coupons
        </Link>
        <span className="divider"></span>

        <Link
          className={`navigation-link ${
            location.pathname.includes("notifications") ? "active" : ""
          }`}
          to="/notifications"
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M10.0247 4.75C9.61049 4.75 9.2747 5.08579 9.2747 5.5C9.2747 5.91421 9.61049 6.25 10.0247 6.25V4.75ZM13.3397 6.25C13.7539 6.25 14.0897 5.91421 14.0897 5.5C14.0897 5.08579 13.7539 4.75 13.3397 4.75V6.25ZM10.4822 17.5C10.4822 17.0858 10.1464 16.75 9.7322 16.75C9.31799 16.75 8.9822 17.0858 8.9822 17.5H10.4822ZM14.3822 17.5C14.3822 17.0858 14.0464 16.75 13.6322 16.75C13.218 16.75 12.8822 17.0858 12.8822 17.5H14.3822ZM11.6822 7.326L11.7043 6.57633C11.6898 6.5759 11.6754 6.57589 11.6609 6.5763L11.6822 7.326ZM16.5514 11.758L17.2986 11.6935C17.2973 11.679 17.2957 11.6646 17.2936 11.6502L16.5514 11.758ZM17.1364 14.758L16.4197 14.9791C16.4441 15.0581 16.4813 15.1326 16.53 15.1994L17.1364 14.758ZM17.3635 16.67L18.0154 17.041C18.0311 17.0132 18.0451 16.9845 18.0573 16.955L17.3635 16.67ZM15.979 17.497L15.979 18.2471L15.9885 18.2469L15.979 17.497ZM7.38343 17.497L7.37395 18.247H7.38343V17.497ZM5.99893 16.67L5.30543 16.9556C5.3175 16.9849 5.33142 17.0134 5.3471 17.041L5.99893 16.67ZM6.2222 14.761L6.82983 15.2006C6.87787 15.1343 6.9147 15.0604 6.93886 14.9821L6.2222 14.761ZM6.8072 11.761L6.06492 11.6536C6.06287 11.6679 6.06122 11.6822 6.05998 11.6965L6.8072 11.761ZM10.0247 6.25H13.3397V4.75H10.0247V6.25ZM8.9822 17.5C8.9822 19.0008 10.1732 20.25 11.6822 20.25V18.75C11.0372 18.75 10.4822 18.2084 10.4822 17.5H8.9822ZM11.6822 20.25C13.1912 20.25 14.3822 19.0008 14.3822 17.5H12.8822C12.8822 18.2084 12.3272 18.75 11.6822 18.75V20.25ZM11.6601 8.07567C13.7382 8.13689 15.4977 9.72056 15.8091 11.8658L17.2936 11.6502C16.8814 8.81119 14.5374 6.65979 11.7043 6.57633L11.6601 8.07567ZM15.8041 11.8225C15.8967 12.8944 16.103 13.9529 16.4197 14.9791L17.853 14.5369C17.5679 13.6128 17.3819 12.6593 17.2986 11.6935L15.8041 11.8225ZM16.53 15.1994C16.7768 15.5384 16.8317 15.9908 16.6698 16.385L18.0573 16.955C18.4159 16.0821 18.298 15.0794 17.7427 14.3166L16.53 15.1994ZM16.7117 16.299C16.5524 16.579 16.2682 16.7433 15.9696 16.7471L15.9885 18.2469C16.832 18.2363 17.5989 17.7727 18.0154 17.041L16.7117 16.299ZM15.979 16.747H7.38343V18.247H15.979V16.747ZM7.3929 16.7471C7.09428 16.7433 6.8101 16.579 6.65075 16.299L5.3471 17.041C5.76357 17.7727 6.53044 18.2363 7.37395 18.2469L7.3929 16.7471ZM6.69242 16.3844C6.53048 15.9912 6.58448 15.5397 6.82983 15.2006L5.61458 14.3214C5.06265 15.0842 4.94681 16.0848 5.30543 16.9556L6.69242 16.3844ZM6.93886 14.9821C7.25551 13.9559 7.4619 12.8974 7.55442 11.8255L6.05998 11.6965C5.97661 12.6623 5.79067 13.6158 5.50554 14.5399L6.93886 14.9821ZM7.54948 11.8684C7.86016 9.72025 9.62274 8.1347 11.7035 8.0757L11.6609 6.5763C8.82409 6.65675 6.47609 8.81078 6.06492 11.6536L7.54948 11.8684Z"
                fill="#58606a"
              />{" "}
            </g>
          </svg>
          Notifications
        </Link>
        <Link
          className={`navigation-link ${
            location.pathname.includes("settings") ? "active" : ""
          }`}
          to="/settings"
        >
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z"
                stroke="#58606a"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z"
                stroke="#58606a"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
            </g>
          </svg>
          Settings
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
