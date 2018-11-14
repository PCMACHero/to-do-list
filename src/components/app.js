import "materialize-css/dist/css/materialize.min.css"
import React, {Component} from 'react';
import axios from 'axios'
import List from './list';
import AddItem from "./add_item";
import "materialize-css/dist/js/materialize"
import "../assets/css/App.css"
// import listData from '../dummy_data/list';
import { randomString } from '../helpers'

const BASE_URL = 'http://api.reactprototypes.com/todos';
const API_KEY = '?key=c918oscar';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            list: [],
            error: ''
        }
    }
    deleteItem = async (id) => {
        console.log('delete item with id: ',id);
        await axios.delete(`${BASE_URL}/${id + API_KEY}`);
        this.getListData();
    }
    // deleteItem = (index) => {
    //     const listCopy = this.state.list.slice();

    //     listCopy.splice(index,1);

    //     this.setState({
    //         list: listCopy
    //     })
    // }
    addItem = async (item) => {
        const resp = await axios.post(BASE_URL+API_KEY, item);
        console.log("add item resp: ", resp);
        this.getListData();
    }
    // addItem = (item)=>{
    //     item._id = randomString(8);
    //     this.setState({
    //         list: [item, ...this.state.list]
    //     })
    // }
    componentDidMount(){
        this.getListData();
    }
    async getListData(){
        try {
            
            const resp = await axios.get(BASE_URL+API_KEY);
            this.setState({
            list: resp.data.todos
             });
            }catch(err){
                this.setState({
                    error: 'Error with stuff'
                })
            }
    }
    // getListData(){
    //     axios.get(BASE_URL + API_KEY).then(resp=>{
    //         console.log('serv: ', resp.data.success);
    //         this.setState({
    //             list: resp.data.todos
    //         });
    //     }).catch((err)=>{
    //         console.log('Error was: ',err.message);
    //         this.setState({
    //             error: "Error getting todos"
    //         });
    //     });
        
        
    // }
    render(){
        const { error } = this.state;
        return (
            <div className="container">
                <h1 className="center">To Do List</h1>
                <AddItem add={this.addItem}/>

                {
                    error 
                    ? <h1 className="center red-text">{error}</h1> 
                    :  <List delete={this.deleteItem} data={this.state.list}/>
                }
               
            </div>
        );
    }
}

export default App;
