'use client'

import React from 'react';
import styled from 'styled-components';
import {IPost, IUser} from "@/types/User.interface";

// Create a styled container for the user info page
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Create a styled card for displaying each user info field
const UserInfoCard = styled.div`
  width: 300px;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #9bff9b;
  border-radius: 5px;
`;


// Create the UserInfo component
const UserInfo = (props: IUser) => {
    const { id, createdAt, updatedAt, firstName,
        lastName, email,} = props;

    return (
        <>
            <UserInfoContainer>
                <UserInfoCard>
                    <strong>ID:</strong> {id}
                </UserInfoCard>
                <UserInfoCard>
                    <strong>Имя:</strong> {firstName}
                </UserInfoCard>
                <UserInfoCard>
                    <strong>Фамилия:</strong> {lastName}
                </UserInfoCard>
                <UserInfoCard>
                    <strong>email:</strong> {email}
                </UserInfoCard>
            </UserInfoContainer>

        </>

    );
};

export default UserInfo;
