<<<<<<< HEAD
import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Pagination,
  Row,
  Typography,
} from "antd";
import moment from "moment";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import CreateLessonModal from "../components/CreateLessonModal";
import { DATE_FORMAT } from "../consts";
import {
  ClassroomDTO,
  CreateLessonDTO,
  DatePaginationDTO,
  GroupDTO,
  ScheduleAssignationDTO,
  ScheduleDTO,
  SubjectDTO,
} from "../dto";
import { FieldNames } from "rc-select/lib/Select";
=======
import {Button, Col, Divider, List, Row, Typography} from 'antd';
import moment from 'moment';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import CreateLessonModal from '../components/CreateLessonModal';
import {DATE_FORMAT, DISPLAY_DATE_FORMAT} from '../consts';
import {ClassroomDTO, CreateLessonDTO, GroupDTO, ScheduleAssignationDTO, ScheduleDTO, SubjectDTO,} from '../dto';
>>>>>>> c8443fb5bbc8f8b1e35d810896293652ef47d89b
import {
  changeLesson,
  createLesson,
  deleteLesson,
  getClassrooms,
  getGroups,
  getSchedules,
  getSchedulesAssignations,
  getSubject,
<<<<<<< HEAD
} from "../api";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
=======
} from '../api';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
>>>>>>> c8443fb5bbc8f8b1e35d810896293652ef47d89b


<<<<<<< HEAD
const Main = (props: Props) => {
  const data = [
    {
      channel: "1",
      zabyl: [
        {
          name: "123",
          time: "12:30",
        },
        {
          name: "Пусть говорят",
          time: "21:00",
        },
      ],
    },
    {
      channel: "1",
      zabyl: [
        {
          name: "123",
          time: "12:30",
        },
        {
          name: "Пусть говорят",
          time: "21:00",
        },
      ],
    },
    {
      channel: "1",
      zabyl: [
        {
          name: "123",
          time: "12:30",
        },
        {
          name: "Пусть говорят",
          time: "21:00",
        },
      ],
    },
    {
      channel: "1",
      zabyl: [
        {
          name: "123",
          time: "12:30",
        },
        {
          name: "Пусть говорят",
          time: "21:00",
        },
      ],
    },
    {
      channel: "1",
      zabyl: [
        {
          name: "123",
          time: "12:30",
        },
        {
          name: "Пусть говорят",
          time: "16:00",
        },
        {
          name: "Пусть говорят",
          time: "21:00",
        },
        {
          name: "Пусть говорят",
          time: "21:00",
        },
      ],
    },
  ];
=======
const generateDateItem = (
  dateNow: string,
  handleModalOpen: (
    id?: number,
    data?: {
      class?: ClassroomDTO;
      subject?: SubjectDTO;
      time?: string;
      group?: (GroupDTO | undefined)[];
      date?: string;
    }
  ) => void,
  i: number,
  schedule: ScheduleDTO[],
  classrooms: ClassroomDTO[],
  subjects: SubjectDTO[],
  groups: GroupDTO[],
  scheduleAssignations: ScheduleAssignationDTO[]
) => {
  const date = moment(dateNow, DATE_FORMAT).add(i, 'days').format(DATE_FORMAT);
  const lessons: {
    id: number;
    class?: ClassroomDTO;
    subject?: SubjectDTO;
    time?: string;
    group?: (GroupDTO | undefined)[];
  }[] = schedule
    .filter((el) => moment(el.date).format(DATE_FORMAT) === date)
    .map((el) => ({
      id: el.id,
      class: classrooms.find((classroom) => classroom.id === el.classroom_id),
      subject: subjects.find((subject) => subject.id === el.subject_id),
      time: el.start_time + '-' + el.end_time,
      group: scheduleAssignations.map((_el) =>
        _el.schedule_id === el.id
          ? groups.find((gr) => _el.group_id === gr.id)
          : undefined
      ),
    }));

  return (
    <Col span={3}>
      <List
        className={
          date === moment(Date.now()).format(DATE_FORMAT) ? 'today' : ''
        }
        size='small'
        header={
          <div>
            {moment(date).format(DISPLAY_DATE_FORMAT)} <Divider style={{ margin: '10px 0 0 0' }} />
          </div>
        }
        bordered
        dataSource={lessons}
        locale={{ emptyText: 'Нет занятий!' }}
        renderItem={(item) => (
          <List.Item
            onClick={() => handleModalOpen(item.id, { ...item, date })}
            className='listItem'
          >
            <Row key={i}>
              <Col flex='1 0 100%'>
                {item.group?.map((el) => el?.name).join(' ')} {item.class?.name}
              </Col>
              <Col flex='1 0 100%'>{item.subject?.name}</Col>
              <Col>
                <Typography.Text type='secondary'>{item.time}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Col>
  );
};
const generateStartDateItems = (
  offset: number,
  setDateItems: Dispatch<SetStateAction<JSX.Element[]>>,
  handleModalOpen: (
    id?: number,
    data?: {
      class?: ClassroomDTO;
      subject?: SubjectDTO;
      time?: string;
      group?: (GroupDTO | undefined)[];
      date?: string;
    }
  ) => void,
  schedule: ScheduleDTO[],
  subjects: SubjectDTO[],
  classrooms: ClassroomDTO[],
  groups: GroupDTO[],
  scheduleAss: ScheduleAssignationDTO[]
) => {
  const startDate = moment(Date.now())
    .startOf('isoWeek')
    .add(offset, 'w')
    .format(DATE_FORMAT);
  let items: JSX.Element[] = [];

  for (let i = 0; i < 7; i++) {
    items.push(
      generateDateItem(
        startDate,
        handleModalOpen,
        i,
        schedule,
        classrooms,
        subjects,
        groups,
        scheduleAss
      )
    );
  }
  setDateItems(items);
};

const Main = () => {
  const [dateItems, setDateItems] = useState<JSX.Element[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<Partial<CreateLessonDTO>>({});
  const [id, setId] = useState<number | null>(null);
  const [offset, setOffset] = useState<number>(0);
>>>>>>> c8443fb5bbc8f8b1e35d810896293652ef47d89b

  const renderWeek = (from: string) => {
    const resDates: DatePaginationDTO[] = [];

    for (let i = 0; i < 7; i++) {
      const mom = moment(from, DATE_FORMAT).add(i + 1, "day");
      resDates.push({
        dayName: mom.format("ddd"),
        date: mom.format(DATE_FORMAT),
      });
    }
    return resDates;
  };
  const [dates, setDates] = useState<DatePaginationDTO[]>(
    renderWeek(moment().subtract(1, "day").format(DATE_FORMAT))
  );

<<<<<<< HEAD
  const isNow = (time: string, nextTime: string = "00:00") => {
    const now = moment();
=======
    generateStartDateItems(
      offset,
      setDateItems,
      handleModalOpen,
      schedules,
      subject,
      classrooms,
      groups,
      schedulesAssignations
    );
  }, [offset, classrooms, groups, schedules, schedulesAssignations, subject]);
>>>>>>> c8443fb5bbc8f8b1e35d810896293652ef47d89b

    return now.isBetween(moment(time, "HH:mm"), moment(nextTime, "HH:mm"));
  };

<<<<<<< HEAD
  const itemRender = useCallback(
    (
      page: number,
      type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
      element: React.ReactNode
    ) => {
      if (type === "prev") {
        return (
          <a>
            <LeftOutlined />
          </a>
        );
      }
      if (type === "next") {
        return (
          <a>
            <RightOutlined />
          </a>
        );
      }
      if (type === "page") {
        return (
          <a>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{lineHeight: '18px'}}>{dates[page-1].dayName}</div>
              <div style={{lineHeight: '10px', fontSize:'11px'}}>{dates[page-1].date.slice(0,5)}</div>
            </div>
          </a>
        );
      }
=======
  const handleModalOpen = (
    id?: number,
    data?: {
      class?: ClassroomDTO;
      subject?: SubjectDTO;
      time?: string;
      group?: (GroupDTO | undefined)[];
      date?: string;
    }
  ) => {
    if (id) {
      setId(id);
      console.log(data);

      setModalData({
        start_time: data?.time?.split('-')[0],
        end_time: data?.time?.split('-')[1],
        subject_id: data?.subject?.id,
        classroom_id: data?.class?.id,
        group_id: data?.group?.map((el) => el?.name).join(' '),
        date: data?.date,
      });
    } else {
      setId(null);
      setModalData({});
    }
>>>>>>> c8443fb5bbc8f8b1e35d810896293652ef47d89b

      return element;
    },
    [dates]
  );

  return (
<<<<<<< HEAD
    <div className="root">
      <Pagination total={50} itemRender={itemRender} showSizeChanger={false} style={{margin: 'auto'}}/>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={[...data,...data]}
        className="list"
        renderItem={(item) => (
          <List.Item style={{ height: "100%" }}>
            <Card
              title={item.channel}
              bordered={false}
              style={{ height: "100%"}}
              bodyStyle={{ padding: "0 15px", height: "100%" }}
            >
              <List style={{ height: "100%" }}>
                {item.zabyl.map((el, idx) => (
                  <List.Item
                    className={`list-item ${
                      isNow(
                        el.time,
                        item.zabyl[idx + 1]?.time || item.zabyl[0].time
                      )
                        ? "text--secondary"
                        : ""
                    }`}
                  >
                    <div>{el.time}</div>&nbsp;
                    <div>{el.name}</div>
                  </List.Item>
                ))}
              </List>
            </Card>
          </List.Item>
        )}
=======
    <div>
      <Row justify='end' style={{ marginBottom: '10px' }}>
        <Col pull={1}>
          <Button onClick={() => handleModalOpen()}>Добавить занятие</Button>
        </Col>
      </Row>
      <Row justify='space-around' align='middle'>
        <Col span={1}>
          <Button onClick={_=> setOffset(offset - 1)} icon shape='circle' size='large'>
            <LeftOutlined />
          </Button>
        </Col>
        <Col span={22}>
          <Row justify='space-around'>{dateItems}</Row>
        </Col>
        <Col span={1} style={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={_=> setOffset(offset + 1)} icon shape='circle' size='large'>
            <RightOutlined />
          </Button>
        </Col>
      </Row>

      <CreateLessonModal
        data={modalData}
        id={id}
        visible={openModal}
        closeModal={closeModal}
        createLesson={createSubject}
        deleteLesson={deleteSubject}
        changeLesson={changeSubject}
        groups={groupsOptions}
        lessons={subjectOptions}
        classrooms={classroomOptions}
>>>>>>> c8443fb5bbc8f8b1e35d810896293652ef47d89b
      />
    </div>
  );
};

export default Main;
