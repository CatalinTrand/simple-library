import {Component} from "react";
import React from "react";
import {attemptDelete, serverName} from "../helpers";

export default class Library extends Component {

    deleteBook(id){
        attemptDelete("books/delete/"+id, response => { if(response.status == 201) location.reload() } );
    }

    render() {
        return (
            <div className="library">
                <h2>Books</h2>
                <div className="new-book" onClick={(e) => {this.props.parent.setState({viewMode: 0})}}>Add New</div>
                <table className="books table-striped">
                    <thead>
                        <tr>
                            <td>Cover Image</td>
                            <td>Name</td>
                            <td>Author</td>
                            <td>Tags</td>
                            <td>Description</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.books.map(
                            book => (
                                <tr>
                                    <td><img src={serverName + "images/" + book.cover_image}/></td>
                                    <td>{book.name}</td>
                                    <td>{book.author_name}</td>
                                    <td>{book.tags}</td>
                                    <td>{book.description.replace(/;/g, ", ")}</td>
                                    <td>
                                        <span onClick={ (e) => { this.props.parent.setState({viewMode: book.id}) } }>Edit</span>
                                        <span onClick={ (e) => { this.deleteBook(book.id) } }>Delete</span>
                                    </td>
                                </tr>)
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}