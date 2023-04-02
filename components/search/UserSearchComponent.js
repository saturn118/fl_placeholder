import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const UserSearchComponent = ({ searchData, searchTerm }) => {
  let iKey = 0;
  const router = useRouter();
  if (searchData.data.length == 1) {
    router.push("user/" + searchData.data[0].username);
  }

  let searchResultElements = searchData.data.map(entry => {
    iKey += 1;
    return (
      <li key={iKey}>
        <Link href={"/user/" + entry.username}>
          <a>{entry.username} </a>
        </Link>
      </li>
    );
  });

  return (
    <>
      <h2>User Search</h2>
      {searchResultElements}
    </>
  );
};

export default UserSearchComponent;
