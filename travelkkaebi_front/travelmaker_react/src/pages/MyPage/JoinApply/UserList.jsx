import React from 'react'
import { useState } from 'react'
import styled from 'styled-components';

function UserList(props) {
  const [data, setData] = useState(props.data);

  return (
    <>
    <div className='user-list'>
      <div className='user-info container'>
        <Avatar src='' />
        <div className='user-info-name container'>
          {data.nickname}
        </div>
      </div>

      <div className='comment-txt container'>
        <p>{data.comment}</p>
        <div className='comment-time'>
          {data.createTime}
        </div>
      </div>
     
    </div>
    </>
  )
}

export default UserList

const Avatar = styled.img `
  width: 50px,
  height: 50px,
  border-radius: 50%,
`