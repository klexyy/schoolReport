import {Button, Col, DatePicker, Modal, Row, Select, TimePicker, Typography} from 'antd';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {DATE_FORMAT, DISPLAY_DATE_FORMAT} from '../consts';
import {CreateLessonDTO} from '../dto';

type Props = {
  data: CreateLessonDTO;
  id: number | null;
  visible: boolean;
  closeModal: () => void;
  createLesson: (lesson: CreateLessonDTO) => void;
  deleteLesson: (id: number) => void;
  changeLesson: (id: number, lesson: CreateLessonDTO) => void;
  lessons: any[];
  groups: any[];
  classrooms: any[];
};
const { Option } = Select;

const CreateLessonModal = ({
  data,
  id,
  visible,
  closeModal,
  createLesson,
  deleteLesson,
  changeLesson,
  lessons,
  groups,
  classrooms,
}: Props) => {
  const [lesson, setLesson] = useState<CreateLessonDTO>({});
  const [selectedGr, setSelectedGr] = useState<string[]>([]);

  useEffect(() => {
    console.log(lesson);
  }, [lesson]);
  useEffect(() => {
    if (lesson.group_id === selectedGr.map(el => groups.find(gr => gr.label == el)?.value).join(' ') ) {
      return
    }
    setLesson({ ...lesson, group_id: selectedGr.map(el => groups.find(gr => gr.label == el)?.value).join(' ') });

  }, [lesson, selectedGr])
  
  useEffect(() => {
    setLesson(data);
    console.log(data);
    
    data.group_id &&
    setSelectedGr(data.group_id?.trim().split(' '))
  }, [data]);

  const validateFields = () => {
    return ![
      lesson.classroom_id,
      lesson.date,
      lesson.end_time,
      lesson.group_id,
      lesson.start_time,
      lesson.subject_id,
    ].includes(undefined);

  };

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      maskClosable={false}
      footer={
        <div>
          {id && (
            <Button
              onClick={() => {
                deleteLesson(id);
                setLesson({});
                setSelectedGr([])
                closeModal();
              }}
              danger
            >
              Удалить
            </Button>
          )}
          <Button
            onClick={() => {
              if (validateFields()) {
                !id ? createLesson(lesson) : changeLesson(id, lesson);
                setLesson({});
                setSelectedGr([])
                closeModal();
              }
            }}
          >
            {id ? 'Изменить' : 'Добавить'}
          </Button>
        </div>
      }
      title='Новое занятие'
    >
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <Row>
          <Col span={8}>
            <Typography.Text>Выберите группу(ы) &nbsp;</Typography.Text>
          </Col>
          <Col span={16}>
            <Select
                mode='multiple'
                optionLabelProp="title"
                filterOption={false}
                style={{ width: '300px' }}
                //@ts-ignore
                value={selectedGr}
                onChange={(el: string[]) => {
                  setSelectedGr(el)
                }}
            >
              {groups.map((el) => (
                  <Option key={el.id} label={el.label as string} value={el.label as string}>
                    {el.label}
                  </Option>
              ))}
            </Select>
          </Col>

        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Выберите кабинет &nbsp;</Typography.Text>
          </Col>
          <Col span={16}>
            <Select
                style={{ width: '300px' }}
                options={classrooms}
                value={lesson.classroom_id}
                onChange={(el) => setLesson({ ...lesson, classroom_id: el })}
            ></Select>
          </Col>

        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Выберите предмет &nbsp;</Typography.Text>
          </Col>
          <Col span={16}>
            <Select
                style={{ width: '300px' }}
                options={lessons}
                value={lesson.subject_id}
                onChange={(el) => setLesson({ ...lesson, subject_id: el })}
            ></Select>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Выберите дату &nbsp;</Typography.Text>
          </Col>
          <Col span={16}>
            <DatePicker
                style={{ width: '300px' }}
                placeholder='Дата занятия'
                value={lesson.date ? moment(lesson.date, DATE_FORMAT) : undefined}
                format={DISPLAY_DATE_FORMAT}
                onChange={(el) =>
                    setLesson({ ...lesson, date: el ? el?.format(DATE_FORMAT) : '' })
                }
            ></DatePicker>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Выберите время &nbsp;</Typography.Text>
          </Col>
          <Col span={16}>
            <TimePicker.RangePicker
                style={{ width: '300px' }}
                format={'HH:mm'}
                minuteStep={5}
                placeholder={['Начало', 'Окончание']}
                value={
                  lesson.start_time
                      ? [
                        moment(lesson.start_time, 'HH:mm'),
                        moment(lesson.end_time, 'HH:mm'),
                      ]
                      : undefined
                }
                onChange={(el) =>
                    setLesson({
                      ...lesson,
                      start_time: el?.[0]?.format('HH:mm'),
                      end_time: el?.[1]?.format('HH:mm'),
                    })
                }
            ></TimePicker.RangePicker>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default CreateLessonModal;
