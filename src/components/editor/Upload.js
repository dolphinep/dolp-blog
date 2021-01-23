import React from "react";
import { useMutation, gql } from "@apollo/client";

const SINGLE_UPLOAD = gql`
  mutation($photo: String!) {
    uploadPhoto(photo: $photo) {
      url
    }
  }
`;

const UploadFile = (props) => {
    const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);
    const onChange = () => { mutate({ variables: { file } }) }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    return (
        <React.Fragment>
            <input type="file" required onChange={onChange} />
        </React.Fragment>
    );
};

export default UploadFile