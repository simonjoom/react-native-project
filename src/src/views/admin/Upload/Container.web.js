import { graphql, compose, withApollo } from "react-apollo";
import { singleUpload, uploads } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

const UploadOut = compose(
  withApollo,
  graphql(uploads),
  graphql(singleUpload, {
    props: ({ mutate, ownProps, ...other }) => ({
      handleUpload: file => { 
        return mutate({
          variables: { file },
          update(
            proxy,
            {
              data: { singleUpload }
            }
          ) {
            const data = proxy.readQuery({ query: uploads });
            var sc = data.uploads.find(
              a => a.filename === singleUpload.filename
            );
            if (!sc) data.uploads.push(singleUpload);
            proxy.writeQuery({ query: uploads, data });
          }
        });
      }
    })
  })
)(Comp);

export default UploadOut;
