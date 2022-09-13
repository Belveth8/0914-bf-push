import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Pagination from '../../../components/Pagenation/Pagination';
import { joinmeurl } from '../../../config';
import { bearerToken } from '../../../util';
import JoinMeCard from '../../JoinMe/JoinMeCard';
import './joinapply.css';

/** 내가 신청한 게시글 보기 */


const JoinApplyList = () => {

const navigate = useNavigate();

const [posts, setPosts] = useState([]);
const [limits] = useState(9);
const [currentPage, setCurrentPage] = useState(1);
const [totalCount, setTotalCount] = useState();

const URL= joinmeurl+"/selectallbypage/myappliedboardlist"
useEffect(() => {
  const fetchPost = async () => {
    const fetchAxios = await axios
      .get(URL + "?pageNo=" + currentPage, bearerToken)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.list);
        console.log("list : ", res.data.list);
        setTotalCount(res.data.totalBoardCount);
        console.log("totalBoardCount", res.data.totalBoardCount);
      });
  };
  return () => fetchPost();
}, [currentPage]);



return (
    <MainContent>
      <header className="appinstructor_banner">
        <div className="appheader-bncontainer">
          <div className="appins-banner-cover">
            <h1 className="appbannername">MY PAGE</h1>
            <p> 내가 신청한 게시글 </p>
          </div>
        </div>
      </header>
      <Content>
        <ContentBody>
          <div className='appKeyButton' style={{margin:'2rem'}}>
            <button> 채택된 글 </button>
            <button> 채택 대기 </button>
          </div>

          <View>
            {posts &&
              posts.map((post) => (
                <JoinMeCard
                  key={post.joinMeId}
                  post={post}
                />
              ))}
          </View>
          <footer>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limits={limits}
              totalCount={totalCount}
            />
          </footer>
        </ContentBody>
      </Content>
    </MainContent>
  );
}

export default JoinApplyList;

const MainContent = styled.main`
  min-height: 800px;
  box-sizing: inherit;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Content = styled.div`
max-width: 1300px;
margin: auto;
padding: 0 05rem;
flex-grow: 1;
position: relative;
width: auto;
display: block;
box-sizing: inherit;
color: #000a12;
`;
const ContentBody = styled.div`
width: 100%;
margin-top: 3rem;
box-sizing: inherit;
`;
const View = styled.div`
width: 100%;
margin-top: 2rem;
padding: 2rem;
grid-template-columns: repeat(3, 1fr);
gap: 80px;
display: grid;
box-sizing: inherit;
`;