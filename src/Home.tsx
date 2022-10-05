import {
  Group,
  Panel,
  PanelHeader,
  SimpleCell,
  SplitCol,
  SplitLayout,
  useAdaptivity,
  View,
  ViewWidth,
  Header
} from '@vkontakte/vkui';
import React from 'react';

export const Home: React.FC = () => {
  const { viewWidth } = useAdaptivity();
  return (
    <SplitLayout header={<PanelHeader separator={false} />}>
      <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
        <View activePanel="main">
          <Panel id="main">
            <PanelHeader>VKUI</PanelHeader>
            <Group header={<Header mode="secondary">Items</Header>}>
              <a href="/about">
                <SimpleCell>Go to spinner</SimpleCell>
              </a>
            </Group>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
