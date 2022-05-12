import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  List,
  Modal,
  Pagination,
  Row,
  Select,
  TimePicker,
  Typography,
} from 'antd';
import moment from 'moment';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import CreateLessonModal from '../components/CreateLessonModal';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from '../consts';
import {
  ClassroomDTO,
  CreateLessonDTO,
  DatePaginationDTO,
  GroupDTO,
  ScheduleAssignationDTO,
  ScheduleDTO,
  SubjectDTO,
} from '../dto';
import { FieldNames } from 'rc-select/lib/Select';

import {
  DeleteFilled,
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  addProgram,
  changeProgram,
  deleteProgram,
  getChannels,
  getData,
} from '../api';

type Props = {
  isLogin: string;
};
const Main = ({ isLogin }: Props) => {
  // const data = [
  //   {
  //     channel: '1',
  //     zabyl: [
  //       {
  //         id: 0,
  //         name: '123',
  //         time: '12:30',
  //       },
  //       {
  //         id: 0,
  //         name: 'Пусть говорят',
  //         time: '21:00',
  //       },
  //     ],
  //   },
  //   {
  //     channel: '1',
  //     zabyl: [
  //       {
  //         id: 0,
  //         name: '123',
  //         time: '12:30',
  //       },
  //       {
  //         id: 0,
  //         name: 'Пусть говорят',
  //         time: '21:00',
  //       },
  //     ],
  //   },
  //   {
  //     channel: '1',
  //     zabyl: [
  //       {
  //         id: 0,
  //         name: '123',
  //         time: '12:30',
  //       },
  //       {
  //         id: 0,
  //         name: 'Пусть говорят',
  //         time: '21:00',
  //       },
  //     ],
  //   },
  //   {
  //     channel: '1',
  //     zabyl: [
  //       {
  //         id: 0,
  //         name: '123',
  //         time: '12:30',
  //       },
  //       {
  //         id: 0,
  //         name: 'Пусть говорят',
  //         time: '21:00',
  //       },
  //     ],
  //   },
  //   {
  //     channel: '1',
  //     zabyl: [
  //       {
  //         id: 0,
  //         name: '123',
  //         time: '12:30',
  //       },
  //       {
  //         id: 0,
  //         name: 'Пусть говорят',
  //         time: '16:00',
  //       },
  //       {
  //         id: 0,
  //         name: 'Пусть говорят',
  //         time: '21:00',
  //       },
  //       {
  //         id: 0,
  //         name: 'Пусть говорят',
  //         time: '21:00',
  //       },
  //     ],
  //   },
  // ];
  const [data, setData] = useState<
    {
      channel_id: number;
      program_id: number;
      channelName: string;
      name: string;
      date: string;
      time: string;
    }[]
  >([]);

  const renderWeek = (from: string) => {
    const resDates: DatePaginationDTO[] = [];

    for (let i = 0; i < 7; i++) {
      const mom = moment(from, DISPLAY_DATE_FORMAT).add(i + 1, 'day');
      resDates.push({
        dayName: mom.format('ddd'),
        date: mom.format(DISPLAY_DATE_FORMAT),
      });
    }
    return resDates;
  };
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format(DISPLAY_DATE_FORMAT)
  );
  const [dates, setDates] = useState<DatePaginationDTO[]>(
    renderWeek(moment().subtract(1, 'day').format(DISPLAY_DATE_FORMAT))
  );

  const isNow = (time: string, nextTime: string = '00:00') => {
    const now = moment();

    return now.isBetween(moment(time, 'HH:mm'), moment(nextTime, 'HH:mm'));
  };

  const itemRender = useCallback(
    (
      page: number,
      type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
      element: React.ReactNode
    ) => {
      if (type === 'prev') {
        return <LeftOutlined />;
      }
      if (type === 'next') {
        return <RightOutlined />;
      }
      if (type === 'page') {
        return (
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
            onClick={() => setSelectedDate(dates[page - 1].date)}
          >
            <div style={{ lineHeight: '18px' }}>{dates[page - 1].dayName}</div>
            <div style={{ lineHeight: '10px', fontSize: '11px' }}>
              {dates[page - 1].date.slice(0, 5)}
            </div>
          </div>
        );
      }

      return element;
    },
    [dates]
  );
  const [temp, setTemp] = useState('');
  const [channels, setChannels] = useState<{ id: number; name: string }[]>([]);
  const [modal, setModal] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [addData, setAddData] = useState<{
    channel_id: number;
    time?: string;
    name: string;
    date?: string;
  }>({ channel_id: 0, name: '', date: moment().format('DD.MM.YYYY') });
  const [addToId, setAddToId] = useState(0);
  const [modalDel, setModalDel] = useState(false);
  const [selectedToChange, setSelectedToChange] = useState(0);
  const [selectedToDel, setSelectedToDel] = useState(0);
  const [modalData, setModalData] = useState<{
    name: string;
    time: string;
  }>({ name: '', time: '' });
  const handleChange = (id: number) => {
    setModal(true);
    setSelectedToChange(id);
    setModalData(
      data.find((el) => el.program_id === id) || { name: '', time: '' }
    );
  };
  const openAddTo = (id: number) => {
    setModalAdd(true);
    setAddData({ ...addData, channel_id: id });
  };
  const handleDelete = (id: number) => {
    setModalDel(true);
    setSelectedToDel(id);
  };
  useEffect(() => {
    getChannels().then(({ data }) => setChannels(data));
    getData(selectedDate).then((result) => {
      setData(result.data);
    });
  }, [selectedDate]);
  return (
    <div className='root'>
      {!channels.length && !data.length ? (
        <></>
      ) : (
        <>
          <Pagination
            total={50}
            itemRender={itemRender}
            showSizeChanger={false}
            style={{ margin: 'auto' }}
          />
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={channels}
            className='list'
            renderItem={(item) => (
              <List.Item style={{ height: '100%' }}>
                <Card
                  title={
                    <Row justify='space-between'>
                      <Typography.Paragraph>{item.name}</Typography.Paragraph>
                      {isLogin && (
                        <PlusOutlined
                          style={{ cursor: 'pointer' }}
                          onClick={() => openAddTo(item.id)}
                        />
                      )}
                    </Row>
                  }
                  bordered={false}
                  style={{ height: '100%' }}
                  bodyStyle={{ padding: '0 15px', height: '100%' }}
                >
                  <List style={{ height: '100%' }}>
                    {data
                      .filter((el) => el.channel_id === item.id)
                      .map((el, idx) => (
                        <List.Item
                          className={`list-item ${
                            ''
                            // isNow(
                            //   el.time,
                            //   item.zabyl[idx + 1]?.time || item.zabyl[0].time
                            // )
                            //   ? 'text--secondary'
                            //   : ''
                          }`}
                        >
                          <div className='row'>
                            <div>{el.time}</div>&nbsp;
                            <div>{el.name}</div>
                          </div>
                          <div className='icons'>
                            {isLogin ? (
                              <>
                                <SettingOutlined
                                  className='settingIcon'
                                  onClick={() => handleChange(el.program_id)}
                                />
                                <DeleteOutlined
                                  className='deleteIcon'
                                  onClick={() => handleDelete(el.program_id)}
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </List.Item>
                      ))}
                    {!data.filter((el) => el.channel_id === item.id).length && (
                      <List.Item className={`list-item`}>Нет передач</List.Item>
                    )}
                  </List>
                </Card>
              </List.Item>
            )}
          />

          <Modal
            title='Изменить передачу'
            visible={modal}
            onCancel={() => setModal(false)}
            onOk={() => {
              changeProgram({ ...modalData, id: selectedToChange }).then(
                (res) => {
                  setModal(false);
                  getData(selectedDate).then((result) => {
                    setData(result.data);
                  });
                }
              );
            }}
          >
            <Row gutter={25}>
              <Col>Время</Col>
              <Col>
                <Input
                  value={modalData.time}
                  onChange={({ target }) =>
                    setModalData({ ...modalData, time: target.value })
                  }
                ></Input>
              </Col>
            </Row>
            <Row gutter={5} style={{ marginTop: '20px' }}>
              <Col>Название</Col>
              <Col>
                <Input
                  value={modalData.name}
                  onChange={({ target }) =>
                    setModalData({ ...modalData, name: target.value })
                  }
                ></Input>
              </Col>
            </Row>
          </Modal>

          <Modal
            title='Добавить передачу'
            visible={modalAdd}
            onCancel={() => {
              setModalAdd(false);
              setAddData({
                channel_id: 0,
                name: '',
                date: moment().format('HH:MM'),
              });
            }}
            onOk={() => {
              //@ts-ignore
              addProgram(addData).then((res) => {
                setModalAdd(false);
                setAddData({
                  channel_id: 0,
                  name: '',
                  date: moment().format('DD.MM.YYYY'),
                });
                getData(selectedDate).then((result) => {
                  setData(result.data);
                });
              });
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                width: '100%',
              }}
            >
              <Row>
                <Col span={5}>Канал</Col>
                <Col span={7}>
                  <Select
                    value={addData.channel_id}
                    onChange={(channel_id) =>
                      setAddData({ ...addData, channel_id })
                    }
                    options={channels.map((el) => ({
                      label: el.name,
                      value: el.id,
                    }))}
                    style={{ width: '200px' }}
                  ></Select>
                </Col>
              </Row>
              <Row>
                <Col span={5}>Название</Col>
                <Col>
                  <Input
                    value={addData.name}
                    onChange={({ target }) =>
                      setAddData({ ...addData, name: target.value })
                    }
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Col span={5}>Дата</Col>
                <Col>
                  <DatePicker
                    value={
                      addData.date
                        ? moment(addData.date, 'DD.MM.YYYY')
                        : moment()
                    }
                    format={'DD.MM.YYYY'}
                    placeholder='Выберите дату'
                    onChange={(_, date) => setAddData({ ...addData, date })}
                  ></DatePicker>
                </Col>
              </Row>
              <Row>
                <Col span={5}>Время начала</Col>
                <Col>
                  <TimePicker
                    value={
                      addData.time ? moment(addData.time, 'HH:mm') : undefined
                    }
                    format={'HH:mm'}
                    onChange={(time) =>
                      setAddData({
                        ...addData,
                        time: moment(time).format('HH:mm'),
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
          </Modal>

          <Modal
            title='Удалить передачу?'
            visible={modalDel}
            onCancel={() => setModalDel(false)}
            onOk={() => {
              deleteProgram(selectedToDel).then((res) => {
                setModalDel(false);
                getData(selectedDate).then((result) => {
                  setData(result.data);
                });
              });
            }}
          ></Modal>
        </>
      )}
    </div>
  );
};

export default Main;
