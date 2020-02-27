import React from 'react';
import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { Title, PostCard } from '../../ui';
import { post as mockPost } from '../../mock';

import Layout from '../../modules/layout/Layout';
import { RootState } from '../../store/modules/rootReducer';
import PostComments from '../../modules/post/PostComments';

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Container = styled(Layout)`
  list-style: none;
`;

interface Props {
  post: {
    commentsContent: {
      id: number;
      author: {
        avatar: string;
        username: string;
      };
      time: string;
      content: string;
    }[];
    comments: number;
    id: number;
    date: string;
    likes: number;
    recycles: number;
    tips: number;
    power: string;
    content: {
      description: string;
      hashtags: string[];
      medias: string[];
    };
    author: {
      avatar: string;
      name: string;
      username: string;
      following: boolean;
    };
  };
}

const Post: NextPage<Props> = ({ post }) => {
  const { avatar } = useSelector((state: RootState) => state.user.profile);

  return (
    <Container>
      <TitleWrapper>
        <Title bordered={false}>Post</Title>
      </TitleWrapper>

      <PostCard post={post} />

      <PostComments comments={post.commentsContent} avatar={avatar as string} />
    </Container>
  );
};

interface Context extends NextPageContext {
  query: {
    id?: string;
  };
}

Post.getInitialProps = async ({ query }: Context) => {
  const post = { ...mockPost, commentsContent: mockPost.comments, comments: mockPost.comments.length };

  return {
    post,
  };
};

export default Post;