import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { joinapply } from "../../../config";
import { useState } from "react";
import { bearerToken } from "../../../util";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import UserList from "./UserList";

/** 나의 글에 신청한 user list  mui 시발 
 * /mypage/myapply/list/appliction
*/

// 내가 쓴 글에 신청한 목록 받기 (상세보기)

function JoinApplyUserList() {

  const navigate = useNavigate();

  const [appList, setAppList] = useState([]);
  let joinmeapplyId = "";


  // 신청자 목록 가져오기
  const appURL = joinapply+"/selectone?joinMeApplyId="
  useEffect(() => {
    const fetchApi = async () => {
      const resApi = await axios
        .get(appURL+"7", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
          },
        })
        .then((res) => {
          console.log("신청get ", res);
          console.log("신청자 닉네임 : ", res.data.nickname);
          setAppList(res.data);
        });
    };
    return () => fetchApi();
  }, []);


  const onClickHandler = () => {
    axios.put(joinapply+"/selected?joinMeApplyId=", joinmeapplyId, bearerToken)
    .then(res => {
      if(res.data === true) {
        alert("채택 완료되었습니다.")
      } else {
        alert("채택할 수 없습니다.")
      }
    })
  }

  return (
    <MainContent>
      <Content>
        <header className="appinstructor_banner">
          <div className="appheader-bncontainer">
            <div className="appins-banner-cover">
              <h1 className="appbannername">MY PAGE</h1>
              <p> 채택하기 </p>
            </div>
          </div>
        </header>

          {appList && appList.map((data) => {
            return (
              <UserList data = {data} />
            )
          })}

        <div className="myappuser-btn">
          <a href="/mypage/myapply/list" className="myapp_btn_cancel">
            뒤로가기
          </a>
          <input
            id="myappuser_btn-submit"
            className="myappuser_btn-submit"
            defaultValue="채택하기"
            onClick={() => navigate(-1)} />
        </div>
      </Content>
    </MainContent>
  );
}

export default JoinApplyUserList;

const MainContent = styled.main`
  min-height: 800px;
  box-sizing: inherit;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 5rem;
  flex-grow: 1;
  position: relative;
  width: auto;
  display: block;
  box-sizing: inherit;
  color: #000a12;
`;

const ProfileImg = styled.img `
  width: 50px,
  height: 50px,
  border-raduis: 50%
`