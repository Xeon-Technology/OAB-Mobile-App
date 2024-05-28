import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
query($query: QueryParams!){
  login:userQuery{
    result:authorize(query:$query){
      token
      expiration 
      me {
        id
        userName
        firstName
        lastName
        address
        dateOfBirth
        email
        sex
        type
        orgUnitId
        orgUnit {
          id
          name
          type
          address
        }
        globalId
        fullName 
        userAccounts{
          id
          accountId
          userId
        }
      },
      restrictedRoutes
      roles
    }
  }
}`;

export const GET_AREA = gql`
query($parentId: Int, $areaId: Int){
  userQuery{
    getArea(parentId:$ parentId, areaId: $areaId){
      id
      name
      areaTypeId
      areaType{
				name
      }
    }
  }
}`;

export const ADD_CONTACT = gql`
  mutation ($request: CreateSingleCRMContact!) {
    mutation: crmMutation {
      result: createContact(request: $request) {
        success
        message
      }
    }
  }
`;

export const GET_GRADES = gql`query($query: QueryParams!){
  query:crmQuery{
    result:getContactTypes(query: $query){
      id
      title
      description
    }
  }
}
`;

export const GET_SURVEY_REPORT = gql`
query($request: GetBulkCRMContacts!) {
  query:crmQuery {
    result:getAllContacts(request: $request) {
      id
      firstName
      phoneNumber
      gender
      age
      nIDNumber
      createdBy {
        firstName
        lastName
      }
      contactType {
        id
        title
        description
      }
      permanentArea {
        id
        name
      }
      presentArea {
        id
        name
      }
    }
  }
}`;

export const ACCOUNT_BY_PHONE_NUMBER = gql`
query($phone: String!, $forDokan: Boolean, $parentId: Int) {
  query: accountQuery {
    result: accountByPhoneNumber(phoneNumber: $phone, forDokan: $forDokan, parentId: $parentId) {
      id
      name
      code
      createDate
      createdUser {
        id
        fullName
      }
      assets {
        id
        title
        type
        fileName
      }
      contact {
        person
        place
        type
        number
        number2
        number3
        notes
      }
    }
  }
}`;
