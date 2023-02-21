import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchDetailPost } from "./modules/actions";
export default function DetailPage(props) {
  const data = useSelector((state) => state.detailPostReducer.data);
  const loading = useSelector((state) => state.detailPostReducer.loading);
  const error = useSelector((state) => state.detailPostReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(actFetchDetailPost(id));
  }, [0]);

  const [state, setState] = useState({
    title: data?.title,
    description: data?.description,
    content: data?.content,
  });

  const testing = () => {
    if (data) {
      console.log(state);
    }
  };

  testing();

  return <></>;
}
