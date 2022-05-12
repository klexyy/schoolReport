import axios from 'axios'
import React from 'react'
import { CreateLessonDTO } from '../dto'

const api = 'http://127.0.0.1:3000'

export const login = (user: {login: string, pass: string}) => {
    return axios.post(`${api}/login`,user)
}

export const changeProgram = (program: {id?: number, time?: string, name?: string}) => {
    return axios.post(`${api}/program`, program)
}
export const addProgram = (program: {time: string, name: string,date: string,channel_id: number}) => {
    console.log(program);
    
    return axios.post(`${api}/program_add`, program)
}

export const deleteProgram = (id: number) => {
    return axios.delete(`${api}/program/${id}`)
}

export const getData = (date: string) => {
    return axios.get(`${api}/info?date=${date}`)
}

export const getChannels = () => {
    return axios.get(`${api}/channels`)
}
