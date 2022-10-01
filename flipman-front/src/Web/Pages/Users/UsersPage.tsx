import React, {useEffect, useState } from "react";
import {
  ContentContainer,
  ContentMenu,
  AlignedPageButtonContainer,
  PageContainer,
  PageTitle,
  PageTitleContainer,
  Label
} from "../../Styles/style";
import FixedCard from "../../Components/FixedCard/FixedCard";
import { Input, Button } from "antd";
import User from "../../../Domain/User";
import UsersTable from "./UsersTable";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import RemoveUser from "./RemoveUser";


const {Search} = Input
const id = "users-page";

function UsersPage() {


  const [users, setUsers] = useState<User[]>([{id: 4, name: 'joao', email: 'joao@email.com', password: 'senha', isAdmin: true}])
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)
  const [isRemovingUser, setIsRemovingUser] = useState<boolean>(false)
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false)

  const handleClickEdit = (user: User) => {
    setIsEditingUser(true)
    setSelectedUser(user)
  }

  const handleClickRemove = (user: User) => {
    setIsRemovingUser(true)
    setSelectedUser(user)
  }

  return (
    <PageContainer id={id}>
      <ContentContainer id={id}>
        <PageTitleContainer>
          <PageTitle>{"Funcionários"}</PageTitle>
        </PageTitleContainer>
        <FixedCard>
            <AlignedPageButtonContainer>
              <Button onClick={() => setIsAddingUser(true)}>
                {"Novo Funcionário"}
              </Button> 
            </AlignedPageButtonContainer>

          <ContentMenu>
            <UsersTable users={users} onClickEdit={handleClickEdit} onClickRemove={handleClickRemove}/>
          </ContentMenu>

          <AddUser
            isOpen={isAddingUser}
            onClose={() => setIsAddingUser(false)}
            />

            <EditUser
                isOpen={isEditingUser}
                onClose={() => setIsEditingUser(false)}
                user={selectedUser}
            />

            <RemoveUser
                isOpen={isRemovingUser}
                onClose={() => setIsRemovingUser(false)}
                user={selectedUser}
            />

        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default UsersPage;


