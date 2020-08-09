import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_HELLO, GET_ALL_RELAWAN } from "../../queries/home";
import { RelawanData } from "../../model/relawan";
import ListRelawan from "./list-relawan";
import Banner from "./banner";

interface Props {
  token: string | null;
}

const Index = ({ token }: Props) => {
  const { data, loading } = useQuery<RelawanData>(GET_ALL_RELAWAN);
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="container">
      <Banner />
      {data?.allRelawan && <ListRelawan allRelawan={data?.allRelawan} />}
    </div>
  );
};

export default Index;
