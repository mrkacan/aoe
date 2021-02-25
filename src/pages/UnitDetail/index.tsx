import * as React from "react";
import HelloChild from "src/components/HelloChild";

class UnitDetail extends React.Component {
  public render() {
    return (
      <div>
        <HelloChild />
        Unit Detail
      </div>
    );
  }
}

export default UnitDetail;
