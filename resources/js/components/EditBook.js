import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {attemptPost, serverName} from "../helpers";

export default class EditBook extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            selectedTags: this.getTagObjects(this.props.book.tags.split(";"))
        }
    }

    getTagByName(name) {
        for (let i = 0; i < this.props.tags.length; i++)
            if (this.props.tags[i].name == name)
                return this.props.tags[i];

        return null;
    }

    getTagObjects(tags) {
        let result = [];
        for (let i = 0; i < tags.length; i++) {
            result.push(this.getTagByName(tags[i]));
        }
        return result;
    }

    saveChanges() {

        let name = document.querySelector("input[name=title]").value;

        let e = document.querySelector("select[name=author_id]");
        let author_id = e.options[e.selectedIndex].value;

        let tags = "";
        for (let i = 0; i < this.state.selectedTags.length; i++) {
            if (tags !== "")
                tags += ";";
            tags += this.state.selectedTags[i].name + "";
        }

        let description = document.querySelector("textarea[name=description]").value;

        let cover_image = document.querySelector("input[type=file]").files[0];

        let formData = new FormData();
        formData.append("id", this.props.book.id);
        formData.append("name", name);
        formData.append("author_id", author_id);
        formData.append("tags", tags);
        formData.append("description", description);
        if (cover_image != null)
            formData.append("cover_image", cover_image);

        attemptPost("books/edit", formData,
            response => {
                if (response.status === 201)
                    location.reload();
                else
                    document.querySelector("p#error-msg").innerHTML = "Error creating the book. Invalid inputs";
            }
        );

    }

    render() {
        return (
            <div>
                <h2>Add new Book</h2>
                <p id="error-msg" style={{color: 'red'}}></p> <br/>
                Title: <br/>
                <input type="text" name="title" defaultValue={this.props.book.name}/> <br/>
                Author: <br/>
                <select name="author_id">
                    {
                        this.props.authors.map(
                            author =>
                                author.id == this.props.book.author_id ?
                                    <option value={author.id} selected>{author.name}</option> :
                                    <option value={author.id}>{author.name}</option>
                        )
                    }
                </select> <br/>
                Tags: <br/>
                <div className="tags-div">
                    {
                        this.props.tags.map(
                            tag =>
                                <div
                                    onClick={(e) => {
                                        let index = this.state.selectedTags.indexOf(tag);
                                        if (index > -1)
                                            this.state.selectedTags.splice(index, 1);
                                        else
                                            this.state.selectedTags.push(tag);
                                        this.forceUpdate();
                                    }}
                                    className={"tag-div" + (this.state.selectedTags.indexOf(tag) > -1 ? " selected" : "")}
                                >{tag.name}</div>
                        )
                    }
                </div>
                <br/>
                Description: <br/>
                <textarea name="description" defaultValue={this.props.book.description}/> <br/>
                Cover image:<br/>
                <img src={serverName + "images/" + this.props.book.cover_image}/> <br/>
                <input type="file" name="cover_image"/> <br/>
                <div className="bottom-buttons">
                    <div onClick={(e) => this.saveChanges()}>Save</div>
                    <div onClick={(e) => this.props.parent.setState({viewMode: -1})}>Cancel</div>
                </div>
            </div>
        );
    }
}