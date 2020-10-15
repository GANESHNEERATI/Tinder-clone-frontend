import axios from 'axios'

const instance=axios.create({

    baseURL:'https://tinder-clone-backend-react.herokuapp.com'
})

export default instance;