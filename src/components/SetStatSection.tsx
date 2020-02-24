import React from 'react';

import styled from 'styled-components';

interface SetStatSectionProps {
  statHeader: string;
  statRows: [{
    left: React.Component;
    right: React.Component;
    center: React.Component;
    barRatio: number;
  }]
}
const SetStatSection = (props: SetStatSectionProps) => {
  return (
    <div className={`${props.className} flex flex-col mb-10 setStatSection`}>
      <div className="h-16 text-4xl font-bold flex justify-center uppercase items-center statHeader">
        { props.statHeader }
      </div>
      <div>
        {
          props.statRows.map((statRow, key) => (
            <div key={key}>
              <div className="statRow h-12 p-3 text-2xl flex font-normal items-center justify-between">
                <div className="w-1/4 flex text-3xl justify-center number">{ statRow.left }</div>
                <div className="w-2/4 flex justify-center uppercase">{ statRow.center }</div>
                <div className="w-1/4 flex text-3xl justify-center number">{ statRow.right }</div>
              </div>
              <div className="h-2 bg-red-700 statRatio">
                <div className="h-full bg-blue-800" style={{width: `${100*statRow.barRatio}%` }}></div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}

const StyledSetStatSection = styled(SetStatSection)`
  .statHeader {
    background-color: ${props => props.theme.secondaryColor};
  }
  .statRow {
    background-color: ${props => props.theme.black};
  }
`;

export default StyledSetStatSection;
