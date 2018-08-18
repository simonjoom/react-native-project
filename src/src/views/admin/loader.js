import React, { Component } from "react";

import { Text } from "react-native";
import Loader from "src/components/loading/FullLoading";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

const loader = WrappedComponent => {
  return class logendLoader extends Component {
    componentWillReceiveProps(nextProps) {
      console.log("Current props: ", this.props);
      console.log("Next props: ", nextProps);
    }
    render() {
      const {
        data: { error, loading }
      } = this.props;

      if (loading) return <Loader />;
      else
        return (
          <KeyboardAwareCenteredView>
            {error &&
              error.graphQLErrors && (
                <Text>
                  Bad:{" "}
                  {error.graphQLErrors.map(({ message }, i) => (
                    <Text key={i}>{message}</Text>
                  ))}
                </Text>
              )}
            <WrappedComponent {...this.props} />
          </KeyboardAwareCenteredView>
        );
    }
  };
};

export { loader };
