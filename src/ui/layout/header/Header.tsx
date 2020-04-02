import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';

import { withApollo } from '../../../apollo/Apollo';

import SearchBar from './SearchBar';
import Actions from './Actions';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(26, 27, 29, 0.8);

  display: flex;
  align-items: center;

  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  overflow: auto;
`;

const Container = styled.div<{ collapsed: boolean; shouldHideHeader: boolean }>`
  width: 100%;
  background: ${props => props.theme.black};
  padding: ${props => (!props.collapsed ? '30px 340px 10px 0' : '30px 160px 10px 0')};

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: fixed;
  top: 0;
  z-index: 10;

  @media (max-width: 1200px) {
    padding: 30px 160px 10px 0;
  }

  @media (max-width: 700px) {
    padding: 30px 15px 10px 0;
  }

  ${props =>
    props.shouldHideHeader &&
    css`
      @media (max-width: 700px) {
        display: none;
      }
    `}
`;

const GET_PROFILES = graphql`
  query Profiles($accountname: String!, $searchterm: String, $page: Int, $pathBuilder: any) {
    profiles(accountname: $accountname, searchterm: $searchterm, page: $page)
      @rest(type: "Profile", pathBuilder: $pathBuilder) {
      accountname
      username
      hash
      displayname
    }
  }
`;

export interface UserProps {
  accountname: string;
  username: string;
  hash: string;
  displayname: string;
}

interface Props {
  collapsed: boolean;
  shouldHideCreatePost?: boolean;
  shouldHideHeader?: boolean;
}

const Header: React.FC<Props> = ({ collapsed, shouldHideCreatePost, shouldHideHeader }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const { data, fetchMore } = useQuery(GET_PROFILES, {
    variables: {
      accountname: 'krmyukbcoguo',
      searchterm: '',
      page: 1,
      pathBuilder: () => `profile/search?Page=${1}&Limit=5&domainId=${1}`,
    },
  });

  const autoCompleteSearch = useCallback(
    async (searchterm: string) => {
      fetchMore({
        variables: {
          searchterm,
          pathBuilder: () => `profile/search/${searchterm}?Page=${1}&Limit=5&domainId=${1}`,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return fetchMoreResult;
        },
      });

      return data ? data.profiles : null;
    },
    [data, fetchMore],
  );

  return searchFocused ? (
    <>
      <Wrapper />
      <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
        <SearchBar
          focused
          setFocused={setSearchFocused}
          search={autoCompleteSearch}
          shouldHideCreatePost={shouldHideCreatePost}
        />
        <Actions focused={searchFocused} shouldHideCreatePost={shouldHideCreatePost} />
      </Container>
    </>
  ) : (
    <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
      <SearchBar
        focused={searchFocused}
        setFocused={setSearchFocused}
        search={autoCompleteSearch}
        shouldHideCreatePost={shouldHideCreatePost}
      />
      <Actions focused={searchFocused} shouldHideCreatePost={shouldHideCreatePost} />
    </Container>
  );
};

export default withApollo()(Header);
