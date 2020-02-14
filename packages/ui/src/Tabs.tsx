import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import TitleWithTabs from './TitleWithTabs';
import TabHeader from './TabHeader';

const Container = styled.div`
  margin-top: 30px;
`;

export interface TabInterface {
  name: string;
  render: React.FC;
}

interface Props {
  title?: string;
  tabs: TabInterface[];
}

const Tabs: React.FC<Props> = ({ title, tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      {title ? (
        <TitleWithTabs tabs={tabs} setActive={setActive} active={active}>
          {title}
        </TitleWithTabs>
      ) : (
        <TabHeader tabs={tabs} setActive={setActive} active={active} />
      )}
      <Container>{tabs[active].render({})}</Container>
    </>
  );
};

export default Tabs;
