import { gql } from "@apollo/client";
export const GET_HELLO = gql`
  {
    hello
  }
`;

export const GET_ALL_RELAWAN = gql`
  query allRelawan {
    allRelawan {
      id
      name
      email
      city
      skill
    }
  }
`;

export const CREATE_RELAWAN = gql`
  mutation createRelawan(
    $name: String!
    $email: String!
    $city: String!
    $skill: String!
  ) {
    createRelawan(name: $name, email: $email, city: $city, skill: $skill) {
      name
      email
      city
      skill
    }
  }
`;

export const GET_RELAWAN = gql`
  query relawan($id: Int!) {
    relawan(id: $id) {
      id
      name
      name
      email
      city
      skill
    }
  }
`;

export const UPDATE_RELAWAN = gql`
  mutation updateRelawan(
    $id: Int!
    $name: String!
    $email: String!
    $city: String!
    $skill: String!
  ) {
    updateRelawan(
      id: $id
      name: $name
      email: $email
      city: $city
      skill: $skill
    )
  }
`;

export const DELETE_RELAWAN = gql`
  mutation deleteRelawan($id: Int!) {
    deleteRelawan(id: $id)
  }
`;
