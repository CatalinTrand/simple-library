import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Library from './Library'
import CreateBook from './CreateBook'
import EditBook from './EditBook'
import {attemptGet} from "../helpers";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMode: -1, //-1 = list, 0 = create, > 0 = edit
            books: [],
            authors: [],
            tags: []
        }
    }

    componentWillMount() {

        //get books
        attemptGet("books", response => {

            if (response.status === 200) {
                this.state.books = response.data;

                attemptGet("authors", response => {
                    if (response.status === 200) {
                        this.state.authors = response.data;
                        attemptGet("tags", response => {
                            if (response.status === 200) {
                                this.state.tags = response.data;
                                this.forceUpdate();
                            }
                        });
                    }
                });
            }
        });
    };

    getWithId(id) {
        for (let i = 0; i < this.state.books.length; i++)
            if (this.state.books[i].id == id)
                return this.state.books[i];

        return null;
    }

    render() {
        console.log(this.state);
        return (
            <div className="container-fluid">
                <div className="top-panel">
                    <div>Library</div>
                    <div>My Account</div>
                </div>
                <div className="container">
                    {
                        this.state.viewMode < 1 ?
                            (this.state.viewMode === -1 ? <Library books={this.state.books} parent={this}/> :
                                <CreateBook parent={this} authors={this.state.authors} tags={this.state.tags}/>) :
                            <EditBook authors={this.state.authors} tags={this.state.tags}
                                      book={this.getWithId(this.state.viewMode)} parent={this}/>
                    }
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))