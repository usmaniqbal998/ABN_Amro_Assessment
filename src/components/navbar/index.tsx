import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { AiOutlineSearch } from "react-icons/ai";

interface NavBarProps {
  onSearchTextChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({
  onSearchTextChanged,
}) => {
  const history = useHistory();
  const { search } = useLocation();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const searchKeyword = urlParams.get("q");
    if (typeof searchKeyword === "string") setSearchText(searchKeyword);
  }, [search]);

  function routeToSearch() {
    history.push({
      pathname: "/search",
      search: searchText
        ? new URLSearchParams({ q: searchText }).toString()
        : undefined,
    });
  }

  return (
    <NavContainer>
      <SearchContainer>
        <SearchInput
          placeholder="Search TV Shows"
          value={searchText}
          onChange={onSearchTextChanged}
          onFocus={routeToSearch}
        />
        <IconContainer>
          <SearchIcon />
        </IconContainer>
      </SearchContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  background-color: #1a242f;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 0.4rem;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: 0px;
  height: 2.8rem;
  padding: 0.4rem 0.8rem;
  width: 30rem;
  transition: width 0.25s ease-out;
  caret-color: #333;
  &:focus {
    width: 38rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  /* border-radius: 0.4rem; */
  overflow: hidden;
  margin-left: 1px;
`;
const SearchIcon = styled(AiOutlineSearch)`
  color: #fff;
  font-size: 1.8rem;
`;

export default NavBar;
