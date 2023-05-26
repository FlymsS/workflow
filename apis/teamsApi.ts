import axios from 'axios';
import React from 'react'

const teamsApi = axios.create({
  baseURL: '/api'
});

export default teamsApi;