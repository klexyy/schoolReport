import axios from 'axios'
import React from 'react'
import { CreateLessonDTO } from '../dto'

const api = 'http://127.0.0.1:3000'

export const createLesson = (lesson: CreateLessonDTO) => {
    return axios.post(`${api}/schedule`,lesson)
}
export const changeLesson = (id: number, lesson: CreateLessonDTO) => {
    return axios.post(`${api}/schedule/${id}`,lesson)
}
export const deleteLesson = (id: number) => {
    return axios.delete(`${api}/schedule/${id}`)
}

export const getGroups = () => {
    return axios.get(`${api}/groups`)
}
export const getClassrooms = () => {
    return axios.get(`${api}/classroom`)
}
export const getSubject = () => {
    return axios.get(`${api}/subject`)
}
export const getSchedules = () => {
    return axios.get(`${api}/schedule`)
}
export const getSchedulesAssignations = () => {
    return axios.get(`${api}/schedule_assignations`)
}