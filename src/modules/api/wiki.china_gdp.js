import axios from 'axios'
const endpoint = 'https://en.wikipedia.org/w/api.php'
const url = endpoint

export default axios.get(url, {
    params: {
        action: 'parse',
        format: 'json', 
        origin: '*',
        page: 'List_of_Chinese_administrative_divisions_by_GDP',
        prop: 'text',
        section: 1
        // rvprop: 'content',
        // rvsction: 0,
    }
})