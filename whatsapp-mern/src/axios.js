import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://morning-ravine-46070.herokuapp.com/',
})

export default instance