import { Button, ButtonGroup, CellButton, Group, Panel, PanelHeader, PanelHeaderBack, Placeholder, Separator, View } from '@vkontakte/vkui';
import React from 'react';
import { Icon56MentionOutline, Icon56MessageReadOutline, Icon56UsersOutline } from '@vkontakte/icons';

export interface InfoProps {
    text?: string;
}

export const Info: React.FC<InfoProps> = ({ text }) => {
  const [activePanel, setActivePanel] = React.useState('example-1');

  const onNavClick = (e: any) => {
    const activePanel = e.currentTarget.dataset.to;
    setActivePanel(activePanel);
  };

  return (
    <View activePanel={activePanel}>
      <Panel id="example-1">
        <PanelHeader>Плейсхолдеры</PanelHeader>
        <Group>
          <Placeholder
            icon={<Icon56UsersOutline/>}
            header="Уведомления от сообществ"
            action={<Button size="m">Подключить сообщества</Button>}
          >
                        Подключите сообщества, от которых Вы хотите получать уведомления
          </Placeholder>
          <Separator/>
          <Placeholder icon={<Icon56MentionOutline/>}>
                        Введите адрес страницы в поле поиска
          </Placeholder>
        </Group>
        <Group>
          <CellButton onClick={onNavClick} data-to="example-2">
                        Ещё примеры
          </CellButton>
        </Group>
      </Panel>

      <Panel id="example-2">
        <PanelHeader
          before={<PanelHeaderBack onClick={onNavClick} data-to="example-1"/>}
        >
                    Плейсхолдеры
        </PanelHeader>
        <Group>
          <Placeholder>Доступ запрещён</Placeholder>
          <Separator/>
          <Placeholder
            header="Находите друзей"
            action={
              <ButtonGroup mode="vertical" align="center">
                <Button size="m">Найти друзей</Button>
                <Button size="m" mode="tertiary">
                                    Подробнее
                </Button>
              </ButtonGroup>
            }
          >
                        Здесь будут отображаться люди, которых вы добавите в друзья
          </Placeholder>
        </Group>
        <Group>
          <CellButton onClick={onNavClick} data-to="example-3">
                        Полноэкранный плейсхолдер
          </CellButton>
        </Group>
      </Panel>

      <Panel id="example-3">
        <PanelHeader
          before={<PanelHeaderBack onClick={onNavClick} data-to="example-1"/>}
        >
                    Плейсхолдеры
        </PanelHeader>

        <Placeholder
          icon={<Icon56MessageReadOutline/>}
          action={
            <Button size="m" mode="tertiary">
                            Показать все сообщения
            </Button>
          }
          stretched
        >
                    Нет непрочитанных
          <br/>
                    сообщений
        </Placeholder>
      </Panel>
    </View>
  );
};
