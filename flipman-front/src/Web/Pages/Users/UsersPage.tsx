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
import EmployeeService from "../../../Services/EmployeeService";
import { GetEmployeesReponse } from "../../../Services/EmployeeService";


const {Search} = Input
const id = "users-page";

function UsersPage() {


  const [users, setUsers] = useState<GetEmployeesReponse[]>([])
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)
  const [isRemovingUser, setIsRemovingUser] = useState<boolean>(false)
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false)

  const handleClickEdit = (user: User) => {
    setIsEditingUser(true)
    setSelectedUser(user)
  }


  const getAllUsers = async () => {
    const response = await EmployeeService.getAll()
    setUsers(response)
  }

  const handleClose = (action: () => void) => {
      action()
      getAllUsers()
  }

  useEffect(() => {getAllUsers()}, [])

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
            <UsersTable users={users}/>
          </ContentMenu>

          <AddUser
            isOpen={isAddingUser}
            onClose={() => handleClose(() => setIsAddingUser(false))}
            />

        </FixedCard>
      </ContentContainer>
    </PageContainer>
  );
}

export default UsersPage;


